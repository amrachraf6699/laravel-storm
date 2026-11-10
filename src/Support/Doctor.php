<?php

namespace AmrAchraf\LaravelStorm\Support;

use AmrAchraf\LaravelStorm\Engines\EngineRegistry;
use AmrAchraf\LaravelStorm\Storage\Store;

final class Doctor
{
    public function __construct(private Store $store, private EngineRegistry $engines) {}

    public function report(bool $refresh = false): array
    {
        $heartbeat = $this->store->meta('supervisor_heartbeat') ?? 0;
        $cached = $this->store->meta('engine_capabilities');
        if ($refresh || ! is_array($cached) || microtime(true) - $cached['time'] > 30) {
            $cached = ['time' => microtime(true), 'engines' => $this->engines->capabilities()];
            $this->store->meta('engine_capabilities', $cached, true);
        }

        return ['php' => PHP_VERSION, 'platform' => PHP_OS_FAMILY, 'supported_platform' => in_array(PHP_OS_FAMILY, ['Windows', 'Linux'], true), 'curl' => extension_loaded('curl'), 'sqlite' => extension_loaded('pdo_sqlite'), 'process_spawning' => function_exists('proc_open'), 'storage_writable' => is_writable($this->store->directory), 'supervisor_online' => microtime(true) - $heartbeat < 5, 'engines' => $cached['engines'], 'measurement_note' => 'Use separate generator hardware for capacity measurements. Embedded UI and diagnostics add overhead.'];
    }
}
