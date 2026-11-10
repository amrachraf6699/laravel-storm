<?php

namespace AmrAchraf\LaravelStorm\Metrics;

final class Aggregator
{
    public Histogram $latency;

    public array $counts = ['started_requests' => 0, 'completed_requests' => 0, 'http_responses' => 0, 'http_errors' => 0, 'unexpected_statuses' => 0, 'transport_errors' => 0, 'timeouts' => 0, 'check_failures' => 0, 'dropped_iterations' => 0, 'samples_retained' => 0, 'samples_dropped' => 0];

    public array $statuses = [];

    public function __construct()
    {
        $this->latency = new Histogram;
    }

    public function observe(array $event): void
    {
        $this->counts['completed_requests']++;
        if (($event['status_code'] ?? null) !== null) {
            $this->counts['http_responses']++;
            $code = (int) $event['status_code'];
            $this->statuses[$code] = ($this->statuses[$code] ?? 0) + 1;
            if ($code >= 400) {
                $this->counts['http_errors']++;
            }
            if (! ($event['expected'] ?? true)) {
                $this->counts['unexpected_statuses']++;
                $this->counts['check_failures']++;
            }
        } else {
            $this->counts['transport_errors']++;
            if (($event['error_type'] ?? null) === 'timeout') {
                $this->counts['timeouts']++;
            }
        }
        if (isset($event['duration_ms'])) {
            $this->latency->add((float) $event['duration_ms']);
        }
    }

    public function summary(float $elapsed): array
    {
        $counts = $this->counts;
        $counts['samples_dropped'] = max(0, $counts['completed_requests'] - $counts['samples_retained']);

        return $counts + ['statuses' => $this->statuses, 'elapsed_seconds' => $elapsed, 'completed_rps' => $elapsed > 0 ? $this->counts['completed_requests'] / $elapsed : 0, 'latency' => $this->latency->summary(), 'http_error_rate' => $this->counts['http_responses'] ? $this->counts['http_errors'] / $this->counts['http_responses'] : null, 'transport_error_rate' => $this->counts['completed_requests'] ? $this->counts['transport_errors'] / $this->counts['completed_requests'] : null, 'check_error_rate' => $this->counts['http_responses'] ? $this->counts['check_failures'] / $this->counts['http_responses'] : null];
    }
}
