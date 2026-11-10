<?php

return [
    'enabled' => env('STORM_ENABLED', false),
    'path' => 'storm',
    'middleware' => ['web'],
    'storage_path' => storage_path('storm'),
    'engine' => 'php',
    'k6_binary' => env('STORM_K6_BINARY', 'k6'),
    'security' => [
        // Exact origins, including ports. Add staging origins deliberately.
        'allowed_origins' => ['http://127.0.0.1:8000', 'http://localhost:8000'],
        'allowed_private_origins' => [],
        'max_virtual_users' => 100,
        'max_duration_seconds' => 300,
        'max_requests_per_second' => 100,
        'max_concurrent_runs' => 1,
        'max_response_bytes' => 1048576,
        'max_artifact_bytes' => 104857600,
        'max_worker_memory_mb' => 512,
        'request_timeout_seconds' => 10,
    ],
    'metrics' => ['sample_limit_per_second' => 50, 'max_samples_per_run' => 5000],
    'capture' => [
        'enabled' => false,
        'max_bytes' => 16384,
        'fields' => [],
        'headers' => ['content-type', 'content-length'],
    ],
    'diagnostics' => [
        'enabled' => false,
        'key' => env('STORM_DIAGNOSTICS_KEY'),
        'sample_rate' => 0.01,
        'max_spool_bytes' => 10485760,
        'relay_url' => env('STORM_DIAGNOSTICS_RELAY_URL'),
    ],
    'retention_days' => 7,
];
