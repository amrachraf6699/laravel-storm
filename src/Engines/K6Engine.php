<?php

namespace AmrAchraf\LaravelStorm\Engines;

use AmrAchraf\LaravelStorm\Contracts\LoadEngine;
use AmrAchraf\LaravelStorm\Data\EngineCapabilities;
use AmrAchraf\LaravelStorm\Data\RunConfiguration;
use AmrAchraf\LaravelStorm\Runs\ProcessIdentity;
use AmrAchraf\LaravelStorm\Runs\RunContext;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use AmrAchraf\LaravelStorm\Storage\Store;
use RuntimeException;
use Symfony\Component\Process\Process;

final class K6Engine implements LoadEngine
{
    private ?EngineCapabilities $capability = null;

    public function __construct(private array $settings, private TargetPolicy $targets) {}

    public function capabilities(): EngineCapabilities
    {
        if ($this->capability !== null) {
            return $this->capability;
        }
        try {
            $process = new Process([$this->settings['k6_binary'], 'version']);
            $process->setTimeout(5)->run();
            preg_match('/k6(?:\.exe)? v(\d+\.\d+\.\d+)/', $process->getOutput(), $m);
            $version = $m[1] ?? null;
            $available = $process->isSuccessful() && $version === '2.3.0';
        } catch (\Throwable) {
            $available = false;
            $version = null;
        }

        return $this->capability = new EngineCapabilities('k6', $available, ['fixed-vus', 'ramping-vus', 'spike', 'constant-arrival-rate', 'ramping-arrival-rate'], $version, $available ? null : 'Install the verified k6 2.3.0 executable and configure STORM_K6_BINARY.');
    }

    public function execute(RunConfiguration $configuration, RunContext $context): void
    {
        if (! $this->capabilities()->available) {
            throw new RuntimeException('Compatible k6 binary is unavailable.');
        }
        $directory = $context->store->directory.'/runs/'.$context->id;
        if (! is_dir($directory)) {
            mkdir($directory, 0700, true);
        }
        $script = $directory.'/journey.js';
        $metrics = $directory.'/metrics.ndjson';
        $samples = $directory.'/samples.ndjson';
        $target = $this->targets->approve($configuration->data['origin']);
        file_put_contents($script, (new K6Script)->generate($configuration->data, $target, $this->settings));
        $process = new Process([$this->settings['k6_binary'], 'run', '--quiet', '--no-color', '--no-usage-report', '--log-format=json', '--console-output='.$samples, '--out=json='.$metrics, $script], $directory, ['STORM_SECRETS' => Store::json(['environment' => $context->environment, 'diagnostic_key' => $this->settings['diagnostics']['key'] ?? null]), 'STORM_RUN_ID' => $context->id, 'GOMEMLIMIT' => $this->settings['security']['max_worker_memory_mb'].'MiB', 'HTTP_PROXY' => false, 'HTTPS_PROXY' => false, 'ALL_PROXY' => false, 'http_proxy' => false, 'https_proxy' => false, 'all_proxy' => false]);
        $process->setTimeout($configuration->duration() + 70)->start();
        $identity = (new ProcessIdentity)->inspect((int) $process->getPid());
        if ($identity !== null) {
            $identity['marker'] = $context->id;
            $run = $context->store->run($context->id);
            $identities = json_decode($run['process_json'] ?? '{}', true);
            $identities['k6'] = $identity;
            $context->store->query('UPDATE storm_runs SET process_json = ? WHERE id = ?', [Store::json($identities), $context->id]);
        }
        $offsets = [$samples => 0, $metrics => 0];
        $lastObservation = 0.0;
        $lastMemoryCheck = microtime(true);
        $context->warn('k6 timing uses http_req_duration (sending + waiting + receiving), excluding connection setup.');
        $context->warn('The global k6 RPS option is a safety ceiling; when reached it can constrain the requested workload.');
        $context->warn('k6 body limits are checked after buffering, not as a streaming download cap. Use trusted bounded fixture responses for body extraction/capture.');
        try {
            $more = false;
            do {
                $previousOffsets = $offsets;
                if ($context->shouldStop()) {
                    $process->stop(3);
                }
                foreach ($offsets as $file => &$offset) {
                    $this->readLines($file, $offset, function (array $line) use ($context, $file, $samples, $configuration, &$lastObservation) {
                        if ($file === $samples) {
                            $payload = isset($line['msg']) ? json_decode($line['msg'], true) : $line;
                            if (isset($payload['storm_ready'])) {
                                $context->markEngineStarted($payload['storm_ready'] / 1000);
                            }
                            if (isset($payload['storm_sample'])) {
                                $context->retainExternalSample($payload['storm_sample']);
                            }

                            return;
                        }
                        if (($line['type'] ?? '') !== 'Point') {
                            return;
                        }
                        $data = $line['data'];
                        $observedElapsed = $context->eventElapsed($data['time']);
                        $tags = $data['tags'] ?? [];
                        switch ($line['metric']) {
                            case 'vus': $context->gauge('active_vus', (int) $data['value'], $observedElapsed);
                                break;
                            case 'http_req_duration':
                                $status = (int) ($tags['status'] ?? 0);
                                $step = null;
                                foreach ($configuration->data['steps'] as $candidate) {
                                    if ($candidate['name'] === ($tags['name'] ?? null)) {
                                        $step = $candidate;
                                        break;
                                    }
                                }
                                $context->observe(['status_code' => $status ?: null, 'duration_ms' => (float) $data['value'], 'expected' => $step !== null && in_array($status, $step['expected_status'], true), 'error_type' => (int) ($tags['error_code'] ?? 0) === 1050 ? 'timeout' : 'transport'], false, $observedElapsed);
                                $lastObservation = max($lastObservation, $observedElapsed);
                                break;
                            case 'storm_started': $context->increment('started_requests', (int) $data['value'], $observedElapsed);
                                break;
                            case 'storm_check_failures': $context->increment('check_failures', (int) $data['value'], $observedElapsed);
                                break;
                            case 'dropped_iterations': $context->increment('dropped_iterations', (int) $data['value'], $observedElapsed);
                                $context->warn('k6 dropped iterations: configured arrival rate was not sustained.');
                                break;
                        }
                    });
                    clearstatcache(true, $file);
                    if (is_file($file) && filesize($file) > $this->settings['security']['max_artifact_bytes']) {
                        throw new RuntimeException('k6 artifact quota exceeded.');
                    }
                }
                unset($offset);
                $process->clearOutput();
                $process->clearErrorOutput();
                $process->checkTimeout();
                if ($process->isRunning() && microtime(true) - $lastMemoryCheck > 1) {
                    $memory = (new ProcessIdentity)->memoryBytes((int) $process->getPid());
                    if ($memory !== null && $memory > $this->settings['security']['max_worker_memory_mb'] * 1048576) {
                        throw new RuntimeException('k6 process exceeded its memory budget.');
                    }
                    $lastMemoryCheck = microtime(true);
                }
                $context->tick();
                $running = $process->isRunning();
                $more = false;
                foreach ($offsets as $file => $position) {
                    clearstatcache(true, $file);
                    if (is_file($file) && filesize($file) > $position) {
                        if (! $running && $previousOffsets[$file] === $position) {
                            $context->warn('Incomplete final k6 output record omitted.');
                        } else {
                            $more = true;
                        }
                    }
                }
                usleep(20000);
            } while ($running || $more);
            if (! $context->shouldStop() && $process->getExitCode() !== 0) {
                throw new RuntimeException('k6 exited unsuccessfully.');
            }
            $context->measurementEnd($context->shouldStop() ? max(.001, $lastObservation) : max($configuration->duration(), $lastObservation));
        } finally {
            if ($process->isRunning()) {
                $process->stop(1);
            }
            foreach ([$script, $metrics, $samples] as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
        }
    }

    public function readLines(string $path, int &$offset, callable $consume): void
    {
        if (! is_file($path)) {
            return;
        }
        $stream = fopen($path, 'rb');
        if ($stream === false) {
            return;
        }
        fseek($stream, $offset);
        $count = 0;
        while ($count++ < 20000 && ($line = fgets($stream, 262145)) !== false) {
            if (! str_ends_with($line, "\n")) {
                if (strlen($line) >= 262144) {
                    fclose($stream);
                    throw new RuntimeException('Oversized k6 output line.');
                }
                break;
            }
            $position = ftell($stream);
            if ($position === false) {
                fclose($stream);
                throw new RuntimeException('Cannot determine k6 stream position.');
            }
            $offset = $position;
            $decoded = json_decode($line, true);
            if (is_array($decoded)) {
                $consume($decoded);
            }
        }
        fclose($stream);
    }
}
