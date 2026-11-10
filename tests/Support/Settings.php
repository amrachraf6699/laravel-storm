<?php

namespace AmrAchraf\LaravelStorm\Tests\Support;

final class Settings
{
    public static function make(string $directory, string $origin = 'http://127.0.0.1:8000'): array
    {
        return ['enabled' => true, 'storage_path' => $directory, 'k6_binary' => getenv('STORM_K6_BINARY') ?: 'k6', 'security' => ['allowed_origins' => [$origin], 'allowed_private_origins' => [], 'max_virtual_users' => 100, 'max_duration_seconds' => 300, 'max_requests_per_second' => 100, 'max_concurrent_runs' => 1, 'max_response_bytes' => 1048576, 'max_artifact_bytes' => 104857600, 'max_worker_memory_mb' => 512, 'request_timeout_seconds' => 2], 'metrics' => ['sample_limit_per_second' => 50, 'max_samples_per_run' => 100], 'capture' => ['enabled' => false, 'max_bytes' => 16384, 'fields' => ['name', 'message', 'public'], 'headers' => ['content-type', 'content-length']], 'diagnostics' => ['enabled' => false, 'key' => str_repeat('s', 64), 'sample_rate' => 1.0, 'max_spool_bytes' => 1048576, 'relay_url' => null], 'retention_days' => 7];
    }

    public static function scenario(string $origin = 'http://127.0.0.1:8000', string $path = '/fast'): array
    {
        return ['schema_version' => 1, 'name' => 'Fixture workload', 'engine' => 'php', 'origin' => $origin, 'steps' => [['name' => 'fixture', 'method' => 'GET', 'path' => $path, 'expected_status' => [200]]], 'workload' => ['mode' => 'fixed-vus', 'vus' => 2, 'duration' => .6, 'rps_limit' => 20], 'thresholds' => [['metric' => 'p95_ms', 'operator' => 'lt', 'value' => 1000]]];
    }
}
