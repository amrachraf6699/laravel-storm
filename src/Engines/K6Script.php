<?php

namespace AmrAchraf\LaravelStorm\Engines;

use AmrAchraf\LaravelStorm\Storage\Store;

final class K6Script
{
    public function generate(array $configuration, array $target, array $settings): string
    {
        $load = $configuration['workload'];
        $mode = $load['mode'];
        $scenario = match ($mode) {
            'fixed-vus' => ['executor' => 'constant-vus', 'vus' => $load['vus'], 'duration' => $load['duration'].'s'],
            'ramping-vus', 'spike' => ['executor' => 'ramping-vus', 'startVUs' => $load['vus'], 'stages' => array_map(fn ($s) => ['duration' => $s['duration'].'s', 'target' => $s['target']], $load['stages'])],
            'constant-arrival-rate' => ['executor' => 'constant-arrival-rate', 'rate' => $load['rate'], 'timeUnit' => '1s', 'duration' => $load['duration'].'s', 'preAllocatedVUs' => $load['vus'], 'maxVUs' => $load['max_vus']],
            'ramping-arrival-rate' => ['executor' => 'ramping-arrival-rate', 'startRate' => $load['rate'], 'timeUnit' => '1s', 'preAllocatedVUs' => $load['vus'], 'maxVUs' => $load['max_vus'], 'stages' => array_map(fn ($s) => ['duration' => $s['duration'].'s', 'target' => $s['target']], $load['stages'])],
            default => throw new \InvalidArgumentException('Unsupported k6 workload.'),
        };
        $scenario['gracefulStop'] = '60s';
        if (isset($scenario['stages']) && $scenario['executor'] === 'ramping-vus') {
            $scenario['gracefulRampDown'] = '60s';
        }
        $ip = str_contains($target['ip'], ':') ? '['.$target['ip'].']' : $target['ip'];
        $options = ['scenarios' => ['storm' => $scenario], 'hosts' => [$target['host'].':'.$target['port'] => $ip.':'.$target['port']], 'maxRedirects' => 0, 'discardResponseBodies' => true, 'rps' => $load['rps_limit'], 'systemTags' => ['status', 'method', 'name', 'scenario', 'expected_response', 'error_code'], 'summaryTrendStats' => ['avg', 'p(50)', 'p(95)', 'p(99)']];
        $publicSettings = ['sample_limit' => $settings['metrics']['sample_limit_per_second'], 'capture' => $settings['capture'], 'max_response_bytes' => $settings['security']['max_response_bytes'], 'diagnostic_rate' => $settings['diagnostics']['sample_rate']];
        $preamble = "import http from 'k6/http';\nimport { sleep } from 'k6';\nimport exec from 'k6/execution';\nimport crypto from 'k6/crypto';\nimport encoding from 'k6/encoding';\nimport { Counter } from 'k6/metrics';\n";
        $preamble .= 'const config = '.Store::json($configuration).";\nconst settings = ".Store::json($publicSettings).";\nexport const options = ".Store::json($options).";\n";

        return $preamble.file_get_contents(__DIR__.'/../../resources/k6/journey.js');
    }
}
