<?php

namespace AmrAchraf\LaravelStorm\Scenarios;

use AmrAchraf\LaravelStorm\Data\RunConfiguration;
use AmrAchraf\LaravelStorm\Security\Redactor;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use InvalidArgumentException;

final class ScenarioValidator
{
    public function __construct(private array $settings, private TargetPolicy $targets) {}

    public function validate(array $input): RunConfiguration
    {
        $this->ensure(strlen(json_encode($input, JSON_THROW_ON_ERROR)) <= 1048576, 'Scenario exceeds 1 MiB.');
        $this->ensure(($input['schema_version'] ?? 1) === 1, 'Unsupported scenario schema version.');
        $target = $this->targets->approve((string) ($input['origin'] ?? ''));
        $engine = $input['engine'] ?? 'php';
        $this->ensure(in_array($engine, ['php', 'k6'], true), 'Unknown engine.');
        $steps = $input['steps'] ?? [];
        $this->ensure(is_array($steps) && count($steps) > 0 && count($steps) <= 50, 'Provide between 1 and 50 request steps.');
        foreach ($steps as $index => &$step) {
            $this->ensure(is_array($step), 'Invalid request step.');
            $this->ensure(! isset($step['body']), 'Use structured json or form fields instead of raw request bodies.');
            $step = array_intersect_key($step, array_flip(['name', 'method', 'path', 'headers', 'json', 'form', 'expected_status', 'timeout', 'think_time', 'extract']));
            $step['name'] = (string) ($step['name'] ?? 'step_'.($index + 1));
            $this->ensure((bool) preg_match('/^[a-zA-Z0-9_-]{1,64}$/', $step['name']), 'Step names must be short identifiers.');
            $step['method'] = strtoupper($step['method'] ?? 'GET');
            $this->ensure(in_array($step['method'], ['GET', 'POST'], true), 'Only GET and POST are supported.');
            $path = $step['path'] ?? '/';
            $this->ensure(is_string($path) && str_starts_with($path, '/') && ! str_starts_with($path, '//') && ! preg_match('/[\\\\\x00-\x20#]/', $path), 'Step paths must be relative absolute paths without whitespace, fragments or backslashes.');
            $step['path'] = $path;
            parse_str(parse_url($path, PHP_URL_QUERY) ?? '', $query);
            $this->referencesOnly($query);
            foreach (['headers', 'json', 'form', 'extract'] as $field) {
                $this->ensure(! isset($step[$field]) || is_array($step[$field]), 'Headers, bodies and extraction rules must be objects.');
            }
            $this->ensure(count($step['extract'] ?? []) <= 20, 'A step supports at most 20 extractors.');
            $step['expected_status'] = (array) ($step['expected_status'] ?? [200]);
            foreach ($step['expected_status'] as $status) {
                $this->ensure(is_int($status) && $status >= 100 && $status <= 599, 'Expected statuses must be HTTP status integers.');
            }
            $step['timeout'] = (float) ($step['timeout'] ?? $this->settings['request_timeout_seconds']);
            $this->ensure($step['timeout'] > 0 && $step['timeout'] <= 60, 'Timeout must be between 0 and 60 seconds.');
            $step['think_time'] = (float) ($step['think_time'] ?? 0);
            $this->ensure($step['think_time'] >= 0 && $step['think_time'] <= 60, 'Think time must be between 0 and 60 seconds.');
            foreach ($step['headers'] ?? [] as $name => $value) {
                $this->ensure(is_string($name) && (bool) preg_match('/^[A-Za-z0-9-]+$/', $name) && is_string($value) && ! preg_match('/[\r\n]/', $value), 'Invalid header.');
                $this->ensure(! in_array(strtolower($name), ['host', 'content-length', 'transfer-encoding', 'proxy-authorization'], true), 'Restricted header.');
            }
            foreach ($step['extract'] ?? [] as $name => $rule) {
                $this->ensure((bool) preg_match('/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/', (string) $name) && is_array($rule), 'Invalid extraction variable.');
                $this->ensure(in_array($rule['source'] ?? '', ['json', 'header', 'css'], true), 'Unknown extraction source.');
                $this->ensure(is_string($rule['path'] ?? null) && strlen($rule['path']) <= 256, 'Extraction requires a bounded path or CSS selector.');
            }
            $this->referencesOnly($step['headers'] ?? []);
            $this->referencesOnly($step['json'] ?? []);
            $this->referencesOnly($step['form'] ?? []);
            $this->ensure(! isset($step['body']), 'Use structured json or form fields instead of raw request bodies.');
            $this->ensure(! (isset($step['json']) && isset($step['form'])), 'Choose json or form, not both.');
        }
        unset($step);
        $this->ensure(count(array_unique(array_column($steps, 'name'))) === count($steps), 'Request step names must be unique.');
        $load = $input['workload'] ?? [];
        $this->ensure(is_array($load), 'Workload must be an object.');
        $load = array_intersect_key($load, array_flip(['mode', 'vus', 'max_vus', 'duration', 'stages', 'rate', 'rps_limit']));
        $load['mode'] = $load['mode'] ?? 'fixed-vus';
        $modes = $engine === 'php' ? ['fixed-vus', 'ramping-vus', 'spike'] : ['fixed-vus', 'ramping-vus', 'spike', 'constant-arrival-rate', 'ramping-arrival-rate'];
        $this->ensure(in_array($load['mode'], $modes, true), 'Workload mode is not supported by this engine.');
        $load['vus'] = (int) ($load['vus'] ?? 10);
        $load['max_vus'] = (int) ($load['max_vus'] ?? $load['vus']);
        $this->ensure($load['vus'] >= 1 && $load['max_vus'] >= $load['vus'] && $load['max_vus'] <= $this->settings['max_virtual_users'], 'VU limit exceeded or invalid VU allocation.');
        $load['duration'] = self::seconds($load['duration'] ?? 30);
        $load['rate'] = (int) ($load['rate'] ?? 1);
        $load['rps_limit'] = (int) ($load['rps_limit'] ?? $this->settings['max_requests_per_second']);
        $this->ensure($load['rps_limit'] >= 1 && $load['rps_limit'] <= $this->settings['max_requests_per_second'], 'Request rate cap exceeded.');
        if ($load['mode'] === 'spike') {
            $load['stages'] = [['duration' => $load['duration'] * .2, 'target' => 1], ['duration' => $load['duration'] * .1, 'target' => $load['max_vus']], ['duration' => $load['duration'] * .5, 'target' => $load['max_vus']], ['duration' => $load['duration'] * .2, 'target' => 1]];
        }
        if (in_array($load['mode'], ['ramping-vus', 'ramping-arrival-rate', 'spike'], true)) {
            $this->ensure(is_array($load['stages'] ?? null) && count($load['stages']) > 0 && count($load['stages']) <= 30, 'Ramping modes require 1–30 stages.');
            $total = 0;
            foreach ($load['stages'] as &$stage) {
                $stage['duration'] = self::seconds($stage['duration'] ?? 0);
                $stage['target'] = (int) ($stage['target'] ?? 0);
                $this->ensure($stage['duration'] > 0 && $stage['target'] >= 0, 'Invalid stage.');
                $limit = str_contains($load['mode'], 'arrival') ? intdiv($load['rps_limit'], count($steps)) : $load['max_vus'];
                $this->ensure($stage['target'] <= $limit, 'Stage exceeds VU or request-rate limit.');
                $total += $stage['duration'];
            }
            unset($stage);
            $load['duration'] = $total;
        }
        if (str_contains($load['mode'], 'arrival')) {
            $this->ensure($load['rate'] >= 1 && $load['rps_limit'] >= $load['rate'] * count($steps), 'Arrival rate times journey steps exceeds the request-rate cap.');
        }
        $this->ensure($load['duration'] > 0 && $load['duration'] <= $this->settings['max_duration_seconds'], 'Duration limit exceeded.');
        $thresholds = $input['thresholds'] ?? [];
        foreach ($thresholds as $rule) {
            $this->ensure(is_array($rule) && in_array($rule['metric'] ?? '', ['p50_ms', 'p95_ms', 'p99_ms', 'http_error_rate', 'transport_error_rate', 'check_error_rate'], true), 'Unknown threshold metric.');
            $this->ensure(is_numeric($rule['value'] ?? null) && $rule['value'] >= 0 && in_array($rule['operator'] ?? 'lt', ['lt', 'lte', 'gt', 'gte'], true), 'Invalid threshold value or operator.');
            $this->ensure(! isset($rule['stage']) || (is_int($rule['stage']) && $rule['stage'] >= 0 && $rule['stage'] < count($load['stages'] ?? [1])), 'Invalid threshold stage.');
        }

        return new RunConfiguration(['schema_version' => 1, 'name' => mb_substr((string) ($input['name'] ?? 'Endpoint test'), 0, 120), 'origin' => $target['origin'], 'engine' => $engine, 'steps' => array_values($steps), 'workload' => $load, 'thresholds' => $thresholds, 'capture' => (bool) ($input['capture'] ?? false), 'diagnostics' => (bool) ($input['diagnostics'] ?? false), 'environment' => $this->environment($input['environment'] ?? [])]);
    }

    public static function seconds(mixed $value): float
    {
        if (is_numeric($value)) {
            return (float) $value;
        }
        if (! is_string($value) || ! preg_match('/^(\d+(?:\.\d+)?)(ms|s|m|h)$/', $value, $m)) {
            throw new InvalidArgumentException('Duration must be seconds or a value such as 30s or 2m.');
        }

        return (float) $m[1] * ['ms' => .001, 's' => 1, 'm' => 60, 'h' => 3600][$m[2]];
    }

    private function referencesOnly(array $values): void
    {
        foreach ($values as $key => $value) {
            if (Redactor::sensitive((string) $key)) {
                $this->ensure(is_string($value) && (bool) preg_match('/^(?:Bearer |Basic )?\{\{(?:env\.[A-Z_][A-Z0-9_]*|[A-Za-z][A-Za-z0-9_]*)\}\}$/D', $value), 'Sensitive fields must reference environment or extracted variables, never literal credentials.');
            }
            if (is_array($value)) {
                $this->referencesOnly($value);
            }
        }
    }

    private function environment(mixed $value): array
    {
        $this->ensure(is_array($value) && count($value) <= 20, 'Environment labels must be a small object.');
        foreach ($value as $key => $item) {
            $this->ensure(! Redactor::sensitive((string) $key) && is_string($item) && strlen($item) <= 200, 'Environment labels must be non-secret short strings.');
        }

        return $value;
    }

    private function ensure(bool $condition, string $message): void
    {
        if (! $condition) {
            throw new InvalidArgumentException($message);
        }
    }
}
