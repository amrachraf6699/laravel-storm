<?php

namespace AmrAchraf\LaravelStorm\Metrics;

final class Thresholds
{
    public function evaluate(array $rules, array $summary, array $stages = []): array
    {
        $results = [];
        foreach ($rules as $rule) {
            $source = isset($rule['stage']) ? ($stages[$rule['stage']] ?? []) : $summary;
            $value = $source[$rule['metric']] ?? $source['latency'][$rule['metric']] ?? null;
            $passed = $value !== null && match ($rule['operator'] ?? 'lt') {
                'lt' => $value < $rule['value'], 'lte' => $value <= $rule['value'],
                'gt' => $value > $rule['value'], 'gte' => $value >= $rule['value'],
                default => false,
            };
            $results[] = $rule + ['observed' => $value, 'passed' => $passed, 'reason' => $value === null ? 'No observations in evaluation window.' : null];
        }

        return ['performance_outcome' => $rules === [] ? 'not_evaluated' : (count(array_filter($results, fn ($r) => ! $r['passed'])) ? 'failed' : 'passed'), 'thresholds' => $results];
    }
}
