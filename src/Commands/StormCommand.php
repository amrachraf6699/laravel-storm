<?php

namespace AmrAchraf\LaravelStorm\Commands;

use AmrAchraf\LaravelStorm\Diagnostics\Spool;
use AmrAchraf\LaravelStorm\Reports\Reports;
use AmrAchraf\LaravelStorm\Runs\RunManager;
use AmrAchraf\LaravelStorm\Runs\Supervisor;
use AmrAchraf\LaravelStorm\Scenarios\ScenarioValidator;
use AmrAchraf\LaravelStorm\Security\Access;
use AmrAchraf\LaravelStorm\Storage\Store;
use AmrAchraf\LaravelStorm\Support\Doctor;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Symfony\Component\Console\Output\OutputInterface;

final class StormCommand extends Command
{
    public const NAMES = ['install', 'doctor', 'login', 'serve', 'test', 'status', 'stop', 'list', 'report', 'prune', 'scenario:import', 'scenario:export', 'diagnostics:relay'];

    public function __construct(private string $operation)
    {
        $this->signature = 'storm:'.$operation.match ($operation) {
            'install' => '',
            'doctor' => ' {--json}',
            'login' => '',
            'serve' => ' {--once : Recover stale runs and exit}',
            'test' => ' {--url=} {--method=GET} {--users=10} {--duration=30s} {--engine=php} {--scenario= : Saved ID or JSON file} {--fail-on-threshold} {--json}',
            'status', 'stop' => ' {run}',
            'list' => ' {--json}',
            'report' => ' {run} {--format=json} {--output=} {--compare=}',
            'prune' => ' {--days=}',
            'scenario:import' => ' {file}',
            'scenario:export' => ' {id} {--output=}',
            'diagnostics:relay' => ' {--once}',
            default => throw new \InvalidArgumentException('Unknown Storm command.'),
        };
        $this->description = match ($operation) {
            'install' => 'Publish Storm configuration and initialize separate SQLite storage',
            'doctor' => 'Check Storm runtime capabilities', 'login' => 'Issue a single-use local dashboard login token',
            'serve' => 'Supervise queued load tests (not an HTTP server)', 'test' => 'Run a controlled HTTP workload',
            'status' => 'Show a persisted run', 'stop' => 'Idempotently request cancellation', 'list' => 'List recent runs',
            'report' => 'Export a sanitized report or compare two runs', 'prune' => 'Prune expired terminal runs',
            'scenario:import' => 'Validate and save a versioned JSON scenario', 'scenario:export' => 'Export a saved scenario',
            'diagnostics:relay' => 'Relay bounded target-side diagnostic batches to the collector',
        };
        parent::__construct();
    }

    public function handle(Store $store, RunManager $manager, Doctor $doctor, ScenarioValidator $validator): int
    {
        try {
            $store->db();

            return match ($this->operation) {
                'install' => $this->installStorm($store),
                'doctor' => $this->outputJson($doctor->report(true)),
                'login' => $this->login(),
                'serve' => $this->serve($manager),
                'test' => $this->testRun($store, $manager),
                'status' => $this->outputJson($store->publicRun($store->run($this->argument('run')))),
                'stop' => $this->stopRun($store),
                'list' => $this->outputJson($store->runs()),
                'report' => $this->report($store),
                'prune' => $this->prune($store),
                'scenario:import' => $this->importScenario($store, $validator),
                'scenario:export' => $this->exportScenario($store),
                'diagnostics:relay' => $this->relay($store),
            };
        } catch (\Throwable $error) {
            // Known validation messages contain no interpolated user values.
            $message = $error instanceof \InvalidArgumentException || $error instanceof \RuntimeException ? $error->getMessage() : 'Storm could not complete the operation. Run storm:doctor and check application configuration.';
            $this->error($message);

            return 1;
        }
    }

    private function installStorm(Store $store): int
    {
        $this->call('vendor:publish', ['--tag' => 'storm-config']);
        $this->info('Storm storage initialized. Set STORM_ENABLED=true, review allowed origins, then run storm:doctor.');
        $this->line('Start your application normally. Run storm:serve in a separate terminal for dashboard tests.');

        return 0;
    }

    private function login(): int
    {
        if (! app()->environment(['local', 'testing'])) {
            throw new \RuntimeException('Local tokens are available only in local/testing. Configure application authentication and the viewStorm gate.');
        }
        $this->line(app(Access::class)->issue());
        $this->info('Single-use token expires in five minutes. Enter it at /'.config('storm.path').'/login.');

        return 0;
    }

    private function serve(RunManager $manager): int
    {
        if (! config('storm.enabled')) {
            throw new \RuntimeException('Set STORM_ENABLED=true before starting the supervisor.');
        }
        $manager->recover();
        if ($this->option('once')) {
            return 0;
        }
        $supervisor = app(Supervisor::class);
        $this->info('Storm supervisor online. Open /'.config('storm.path').' in your running Laravel application.');
        $this->registerSignals($supervisor);
        $supervisor->loop();

        return 0;
    }

    private function testRun(Store $store, RunManager $manager): int
    {
        $manager->recover();
        if ($scenario = $this->option('scenario')) {
            $input = $this->loadScenario($store, $scenario);
            // Only override a saved engine when explicitly supplied.
            if ($this->input->hasParameterOption('--engine')) {
                $input['engine'] = $this->option('engine');
            }
        } else {
            $parts = parse_url((string) $this->option('url'));
            if (! is_array($parts) || ! isset($parts['scheme'], $parts['host'])) {
                throw new \InvalidArgumentException('Provide --url or --scenario.');
            }
            $origin = $parts['scheme'].'://'.$parts['host'].(isset($parts['port']) ? ':'.$parts['port'] : '');
            $input = ['name' => 'CLI endpoint test', 'engine' => $this->option('engine'), 'origin' => $origin, 'steps' => [['method' => $this->option('method'), 'path' => ($parts['path'] ?? '/').(isset($parts['query']) ? '?'.$parts['query'] : '')]], 'workload' => ['mode' => 'fixed-vus', 'vus' => (int) $this->option('users'), 'duration' => $this->option('duration')]];
            if (isset($parts['user']) || isset($parts['fragment'])) {
                throw new \InvalidArgumentException('URL credentials and fragments are not supported.');
            }
        }
        $run = $manager->create($input);
        if (! $this->option('json')) {
            $this->info('Running '.$run['id'].' · '.$run['engine']);
        }
        $heartbeat = $store->meta('supervisor_heartbeat') ?? 0;
        if (microtime(true) - $heartbeat < 5) {
            while (! in_array($store->run($run['id'])['status'], ['completed', 'cancelled', 'failed'], true)) {
                if (microtime(true) - ($store->meta('supervisor_heartbeat') ?? 0) > 10) {
                    throw new \RuntimeException('Supervisor stopped. Restart storm:serve to recover this run.');
                }
                usleep(100000);
            }
        } else {
            $supervisor = app(Supervisor::class);
            $this->registerSignals($supervisor);
            $supervisor->loop($run['id']);
        }
        $result = $store->run($run['id']);
        $this->outputJson($result['report'] ?? $store->publicRun($result));

        return match ($result['status']) {
            'failed' => 1, 'cancelled' => 130,
            default => $this->option('fail-on-threshold') && $result['performance_outcome'] === 'failed' ? 2 : 0,
        };
    }

    private function registerSignals(Supervisor $supervisor): void
    {
        if (extension_loaded('pcntl')) {
            $this->trap([SIGINT, SIGTERM], fn () => $supervisor->requestShutdown());
        }
        if (PHP_OS_FAMILY === 'Windows' && function_exists('sapi_windows_set_ctrl_handler')) {
            sapi_windows_set_ctrl_handler(function (int $event) use ($supervisor): void {
                $supervisor->requestShutdown();
            });
        }
    }

    private function stopRun(Store $store): int
    {
        $store->stop($this->argument('run'));

        return $this->outputJson($store->publicRun($store->run($this->argument('run'))));
    }

    private function report(Store $store): int
    {
        $report = $store->run($this->argument('run'))['report'];
        if ($report === null) {
            throw new \RuntimeException('No report is available yet.');
        }
        $reports = new Reports;
        if ($other = $this->option('compare')) {
            $otherReport = $store->run($other)['report'];
            if ($otherReport === null) {
                throw new \RuntimeException('Comparison run has no report.');
            }
            $report = $reports->compare($report, $otherReport);
        }
        $format = $this->option('format');
        if (! in_array($format, ['json', 'html'], true)) {
            throw new \InvalidArgumentException('Report format must be json or html.');
        }
        $content = $format === 'html' ? $reports->html($report) : json_encode($report, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
        if ($output = $this->option('output')) {
            if (file_put_contents($output, $content) === false) {
                throw new \RuntimeException('Report output could not be written.');
            }
        } else {
            $this->output->writeln($content, OutputInterface::OUTPUT_RAW);
        }

        return 0;
    }

    private function prune(Store $store): int
    {
        $count = $store->prune((int) ($this->option('days') ?? config('storm.retention_days')));
        foreach (glob($store->directory.'/runs/*', GLOB_ONLYDIR) ?: [] as $directory) {
            if (is_link($directory) || ! preg_match('/^[a-f0-9]{32}$/', basename($directory)) || $store->query('SELECT id FROM storm_runs WHERE id = ?', [basename($directory)])->fetch()) {
                continue;
            }
            foreach (['journey.js', 'metrics.ndjson', 'samples.ndjson'] as $name) {
                if (is_file($directory.'/'.$name) && ! is_link($directory.'/'.$name)) {
                    unlink($directory.'/'.$name);
                }
            }
            @rmdir($directory);
        }
        $this->info('Pruned '.$count.' expired runs.');

        return 0;
    }

    private function importScenario(Store $store, ScenarioValidator $validator): int
    {
        $config = $validator->validate($this->loadScenario($store, $this->argument('file')))->toArray();

        return $this->outputJson(['id' => $store->saveScenario($config), 'configuration' => $config]);
    }

    private function exportScenario(Store $store): int
    {
        $config = $this->loadScenario($store, $this->argument('id'));
        if ($output = $this->option('output')) {
            file_put_contents($output, json_encode($config, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR));

            return 0;
        }

        return $this->outputJson($config);
    }

    private function loadScenario(Store $store, string $source): array
    {
        if (is_file($source)) {
            if (filesize($source) > 1048576) {
                throw new \InvalidArgumentException('Scenario file exceeds 1 MiB.');
            }
            $config = json_decode(file_get_contents($source), true, 64, JSON_THROW_ON_ERROR);
        } else {
            $row = $store->query('SELECT config_json FROM storm_scenarios WHERE id = ?', [$source])->fetchColumn();
            if (! $row) {
                throw new \InvalidArgumentException('Scenario ID or file was not found.');
            }
            $config = json_decode($row, true, 64, JSON_THROW_ON_ERROR);
        }
        if (! is_array($config)) {
            throw new \InvalidArgumentException('Scenario must be a JSON object.');
        }

        return $config;
    }

    private function relay(Store $store): int
    {
        $settings = config('storm.diagnostics');
        $url = $settings['relay_url'];
        $parts = parse_url($url ?? '');
        $loopback = in_array($parts['host'] ?? '', ['127.0.0.1', 'localhost', '[::1]'], true);
        if (! isset($parts['scheme']) || ! ($parts['scheme'] === 'https' || ($parts['scheme'] === 'http' && $loopback)) || ! is_string($settings['key']) || strlen($settings['key']) < 32) {
            throw new \InvalidArgumentException('Configure a HTTPS relay URL (or loopback SSH tunnel) and a signing key of at least 32 characters.');
        }
        $spool = new Spool($store, $settings);
        do {
            $batch = $spool->batch();
            if (($batch['events'] ?? []) !== []) {
                $body = Store::json(['events' => $batch['events']]);
                $timestamp = (string) time();
                (new Client)->post($url, ['body' => $body, 'headers' => ['Content-Type' => 'application/json', 'X-Storm-Timestamp' => $timestamp, 'X-Storm-Signature' => hash_hmac('sha256', $timestamp.'.'.$body, $settings['key'])], 'timeout' => 5, 'allow_redirects' => false]);
                $spool->acknowledge($batch['offset']);
            }
            if (! $this->option('once')) {
                usleep(500000);
            }
        } while (! $this->option('once'));

        return 0;
    }

    private function outputJson(mixed $value): int
    {
        $this->output->writeln(json_encode($value, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE), OutputInterface::OUTPUT_RAW);

        return 0;
    }
}
