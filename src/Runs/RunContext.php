<?php

namespace AmrAchraf\LaravelStorm\Runs;

use AmrAchraf\LaravelStorm\Data\RunConfiguration;
use AmrAchraf\LaravelStorm\Metrics\Aggregator;
use AmrAchraf\LaravelStorm\Metrics\Thresholds;
use AmrAchraf\LaravelStorm\Security\Redactor;
use AmrAchraf\LaravelStorm\Storage\Store;

final class RunContext
{
    public float $started;

    private float $startedWall;

    private ?float $measurementEnd = null;

    private array $dirty = [];

    public Aggregator $total;

    private array $buckets = [];

    private array $stages = [];

    private array $warnings = [];

    private array $gauges = ['active_vus' => 0, 'in_flight' => 0];

    private array $bucketGauges = [];

    private float $lastFlush = -1;

    private int $sampleCount = 0;

    private bool $cancelled = false;

    public function __construct(public readonly string $id, public readonly Store $store, public readonly RunConfiguration $configuration, public readonly array $settings, public readonly Redactor $redactor, public readonly array $environment = [])
    {
        $this->started = hrtime(true) / 1e9;
        $this->startedWall = microtime(true);
        $this->total = new Aggregator;
        foreach ($environment as $secret) {
            $redactor->registerSecret((string) $secret);
        }
    }

    public function elapsed(): float
    {
        return hrtime(true) / 1e9 - $this->started;
    }

    public function markEngineStarted(float $unixSeconds): void
    {
        $this->startedWall = $unixSeconds;
        $this->started = hrtime(true) / 1e9 - max(0, microtime(true) - $unixSeconds);
        $this->lastFlush = -1;
    }

    public function eventElapsed(string $timestamp): float
    {
        $date = new \DateTimeImmutable($timestamp);

        return max(0, (float) $date->format('U.u') - $this->startedWall);
    }

    public function measurementEnd(float $seconds): void
    {
        $this->measurementEnd = max(.001, $seconds);
    }

    public function gauge(string $name, int $value, ?float $elapsed = null): void
    {
        $second = (int) ($elapsed ?? $this->elapsed());
        $this->gauges[$name] = max(0, $value);
        $this->bucketGauges[$second] = $this->gauges;
        $this->bucket($elapsed);
    }

    public function stage(?float $elapsed = null): int
    {
        $elapsed ??= $this->elapsed();
        $end = 0;
        foreach ($this->configuration->data['workload']['stages'] ?? [] as $index => $stage) {
            $end += $stage['duration'];
            if ($elapsed < $end) {
                return $index;
            }
        }

        return max(0, count($this->configuration->data['workload']['stages'] ?? []) - 1);
    }

    public function startedRequest(): void
    {
        $this->total->counts['started_requests']++;
        $this->bucket()->counts['started_requests']++;
        $this->stageAggregator()->counts['started_requests']++;
    }

    public function observe(array $event, bool $sampleCandidate = true, ?float $observedElapsed = null): void
    {
        $bucket = $this->bucket($observedElapsed);
        $stage = $this->stageAggregator($observedElapsed);
        $this->total->observe($event);
        $bucket->observe($event);
        $stage->observe($event);
        $keep = $sampleCandidate && $bucket->counts['samples_retained'] < $this->settings['metrics']['sample_limit_per_second'] && $this->sampleCount < $this->settings['metrics']['max_samples_per_run'];
        $counter = $keep ? 'samples_retained' : 'samples_dropped';
        $this->total->counts[$counter]++;
        $bucket->counts[$counter]++;
        if ($keep) {
            $this->sampleCount++;
            $event = $this->redactor->event($event);
            $this->store->sample($this->id, ['schema_version' => 1, 'sample_id' => bin2hex(random_bytes(8)), 'engine' => $this->configuration->engine(), 'timestamp' => gmdate('c'), 'elapsed_second' => (int) $this->elapsed(), 'stage' => $this->stage()] + $event, $this->settings['metrics']['max_samples_per_run']);
        }
        $this->tick();
    }

    public function increment(string $counter, int $value = 1, ?float $observedElapsed = null): void
    {
        $this->total->counts[$counter] += $value;
        $this->bucket($observedElapsed)->counts[$counter] += $value;
    }

    public function retainExternalSample(array $event): void
    {
        $sampleElapsed = isset($event['elapsed_ms']) ? $event['elapsed_ms'] / 1000 : $this->elapsed();
        $bucket = $this->bucket($sampleElapsed);
        if ($this->sampleCount >= $this->settings['metrics']['max_samples_per_run'] || $bucket->counts['samples_retained'] >= $this->settings['metrics']['sample_limit_per_second']) {
            return;
        }
        $this->sampleCount++;
        $this->total->counts['samples_retained']++;
        $bucket->counts['samples_retained']++;
        $this->total->counts['samples_dropped'] = max(0, $this->total->counts['samples_dropped'] - 1);
        $bucket->counts['samples_dropped'] = max(0, $bucket->counts['samples_dropped'] - 1);
        $this->store->sample($this->id, ['schema_version' => 1, 'engine' => 'k6', 'sample_id' => bin2hex(random_bytes(8)), 'timestamp' => gmdate('c'), 'elapsed_second' => (int) $sampleElapsed] + $this->redactor->event($event), $this->settings['metrics']['max_samples_per_run']);
    }

    public function warn(string $message): void
    {
        $this->warnings[$message] = true;
    }

    public function tick(bool $force = false): void
    {
        $elapsed = $this->elapsed();
        if (! $force && $elapsed - $this->lastFlush < .5) {
            return;
        }
        $before = hrtime(true);
        $this->store->heartbeat($this->id);
        $this->cancelled = in_array($this->store->run($this->id)['status'], ['stopping', 'cancelled', 'failed'], true);
        foreach (array_keys($this->dirty) as $second) {
            $bucket = $this->buckets[$second];
            $interval = min(1, max(.001, $elapsed - $second));
            $this->store->bucket($this->id, $second, ['schema_version' => 1, 'elapsed_second' => $second, 'stage' => $this->stage((float) $second), 'latency_histogram' => $bucket->latency->encode()] + ($this->bucketGauges[$second] ?? $this->gauges) + $bucket->summary($interval));
            unset($this->dirty[$second]);
        }
        $this->lastFlush = $elapsed;
        if ((hrtime(true) - $before) / 1e9 > .25) {
            $this->warn('Metrics persistence delayed the generator; target capacity is inconclusive.');
        }
        if (memory_get_usage(true) > $this->settings['security']['max_worker_memory_mb'] * 1024 * 1024 * .8) {
            $this->warn('Generator memory pressure detected.');
        }
    }

    public function shouldStop(): bool
    {
        $this->tick();

        return $this->cancelled;
    }

    public function finish(bool $partial, ?string $failure = null): array
    {
        $this->tick(true);
        $elapsed = $this->measurementEnd ?? max(.001, $this->elapsed());
        $summary = $this->total->summary($elapsed);
        $stages = [];
        $lastPassing = null;
        $highestPassingTarget = -1;
        ksort($this->stages, SORT_NUMERIC);
        foreach ($this->stages as $index => $aggregator) {
            $stageStart = array_sum(array_column(array_slice($this->configuration->data['workload']['stages'] ?? [], 0, $index), 'duration'));
            $duration = $this->configuration->data['workload']['stages'][$index]['duration'] ?? $elapsed;
            $stages[$index] = $aggregator->summary(max(.001, min($elapsed - $stageStart, $duration)));
            $rules = array_values(array_filter($this->configuration->data['thresholds'], fn ($rule) => ! isset($rule['stage']) || $rule['stage'] === $index));
            $rules = array_map(function ($rule) {
                unset($rule['stage']);

                return $rule;
            }, $rules);
            $verdict = (new Thresholds)->evaluate($rules, $stages[$index]);
            $stages[$index] += $verdict;
            $target = $this->configuration->data['workload']['stages'][$index]['target'] ?? $this->configuration->data['workload']['vus'];
            if ($verdict['performance_outcome'] === 'passed' && $target >= $highestPassingTarget) {
                $lastPassing = $index;
                $highestPassingTarget = $target;
            }
        }
        $thresholds = (new Thresholds)->evaluate($this->configuration->data['thresholds'], $summary, $stages);
        $report = ['schema_version' => 1, 'run_id' => $this->id, 'partial' => $partial, 'execution_error' => $failure, 'configuration' => $this->configuration->toArray(), 'summary' => $summary, 'stages' => $stages, 'warnings' => array_keys($this->warnings), 'limitations' => ['Application-hosted dashboard and SQLite share resources with the target when installed on the same machine.', 'Samples are capped; error/tail samples may be prioritized and are not the aggregate distribution.', 'PHP latency includes connection setup; k6 http_req_duration excludes connection setup. Transport attempts are included where the engine reports durations.', 'Generator CPU saturation is not reliably observable on all hosts. Record external CPU/network telemetry for capacity conclusions.', 'Arrival rate means journey iterations per second; each journey can contain multiple HTTP requests.'], 'generator' => ['php_version' => PHP_VERSION, 'os' => PHP_OS_FAMILY, 'peak_memory_bytes' => memory_get_peak_usage(true)]] + $thresholds;
        $report['last_passing_tested_stage'] = $lastPassing;
        $this->store->report($this->id, $report);

        return $report;
    }

    private function bucket(?float $elapsed = null): Aggregator
    {
        $second = (int) ($elapsed ?? $this->elapsed());
        $this->dirty[$second] = true;

        return $this->buckets[$second] ??= new Aggregator;
    }

    private function stageAggregator(?float $elapsed = null): Aggregator
    {
        return $this->stages[$this->stage($elapsed)] ??= new Aggregator;
    }
}
