<?php

namespace AmrAchraf\LaravelStorm\Reports;

use AmrAchraf\LaravelStorm\Metrics\Aggregator;
use AmrAchraf\LaravelStorm\Metrics\Histogram;
use AmrAchraf\LaravelStorm\Metrics\Thresholds;
use AmrAchraf\LaravelStorm\Storage\Store;

final class RecoveryReport
{
    public static function persist(Store $store, array $run, string $reason): void
    {
        $aggregate = new Aggregator;
        $elapsed = 0;
        $after = -1;
        do {
            $buckets = $store->metrics($run['id'], $after, 1000);
            foreach ($buckets as $bucket) {
                foreach ($aggregate->counts as $key => $_) {
                    $aggregate->counts[$key] += $bucket[$key] ?? 0;
                }
                foreach ($bucket['statuses'] ?? [] as $status => $count) {
                    $aggregate->statuses[$status] = ($aggregate->statuses[$status] ?? 0) + $count;
                }
                if (isset($bucket['latency_histogram'])) {
                    $aggregate->latency->merge(Histogram::decode($bucket['latency_histogram']));
                }
                $after = $bucket['elapsed_second'];
                $elapsed = max($elapsed, $after + 1);
            }
        } while (count($buckets) === 1000);
        $summary = $aggregate->summary($elapsed);
        $report = ['schema_version' => 1, 'run_id' => $run['id'], 'partial' => true, 'execution_error' => $reason, 'configuration' => $run['configuration'], 'summary' => $summary, 'stages' => [], 'warnings' => ['Recovered from persisted metric buckets. Unflushed observations may be missing; elapsed time is rounded to bucket boundaries.'], 'limitations' => ['Interrupted runs cannot establish target capacity. Stage thresholds without recoverable stage data fail as unevaluated.']] + (new Thresholds)->evaluate($run['configuration']['thresholds'], $summary);
        $store->report($run['id'], $report);
    }
}
