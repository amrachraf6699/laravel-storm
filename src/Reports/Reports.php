<?php

namespace AmrAchraf\LaravelStorm\Reports;

final class Reports
{
    public function html(array $report): string
    {
        $json = htmlspecialchars(json_encode($report, JSON_PRETTY_PRINT | JSON_INVALID_UTF8_SUBSTITUTE), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Laravel Storm report</title><style>body{background:#101720;color:#dfe8ef;font:16px system-ui;max-width:1100px;margin:3rem auto;padding:1rem}pre{white-space:pre-wrap;overflow-wrap:anywhere}h1{color:#69eed1}</style><h1>Laravel Storm</h1><p>Measured results · sampled diagnostics · approximate percentiles</p><pre>'.$json.'</pre></html>';
    }

    public function compare(array $left, array $right): array
    {
        $warnings = [];
        foreach (['origin', 'steps', 'workload', 'environment', 'engine', 'diagnostics', 'capture'] as $key) {
            if (($left['configuration'][$key] ?? null) !== ($right['configuration'][$key] ?? null)) {
                $warnings[] = "Configuration differs: {$key}";
            }
        }
        $diff = [];
        foreach (['completed_rps', 'http_error_rate', 'transport_error_rate'] as $metric) {
            $a = $left['summary'][$metric] ?? null;
            $b = $right['summary'][$metric] ?? null;
            $diff[$metric] = ['before' => $a, 'after' => $b, 'difference' => $a !== null && $b !== null ? $b - $a : null];
        }
        foreach (['p50_ms', 'p95_ms', 'p99_ms'] as $metric) {
            $a = $left['summary']['latency'][$metric] ?? null;
            $b = $right['summary']['latency'][$metric] ?? null;
            $diff[$metric] = ['before' => $a, 'after' => $b, 'difference' => $a !== null && $b !== null ? $b - $a : null];
        }

        return ['schema_version' => 1, 'differences' => $diff, 'warnings' => $warnings, 'interpretation' => 'Observed differences between two runs; not a statistical significance test.'];
    }
}
