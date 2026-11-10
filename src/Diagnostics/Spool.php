<?php

namespace AmrAchraf\LaravelStorm\Diagnostics;

use AmrAchraf\LaravelStorm\Storage\Store;

final class Spool
{
    public function __construct(private Store $store, private array $settings) {}

    public function append(array $event): bool
    {
        if (! is_dir($this->store->directory)) {
            mkdir($this->store->directory, 0700, true);
        }
        $file = fopen($this->store->directory.'/diagnostics.ndjson', 'c+b');
        if ($file === false || ! flock($file, LOCK_EX | LOCK_NB)) {
            if (is_resource($file)) {
                fclose($file);
            }

            return false;
        }
        fseek($file, 0, SEEK_END);
        $line = Store::json($event)."\n";
        $accepted = strlen($line) <= 4096 && ftell($file) + strlen($line) <= $this->settings['max_spool_bytes'];
        if ($accepted) {
            fwrite($file, $line);
        }
        flock($file, LOCK_UN);
        fclose($file);

        return $accepted;
    }

    public function batch(int $limit = 100): array
    {
        $path = $this->store->directory.'/diagnostics.ndjson';
        if (! is_file($path)) {
            return [];
        }
        $file = fopen($path, 'rb');
        if ($file === false || ! flock($file, LOCK_SH | LOCK_NB)) {
            if (is_resource($file)) {
                fclose($file);
            }

            return [];
        }
        $offset = (int) ($this->store->meta('diagnostics_offset') ?? 0);
        fseek($file, $offset);
        $events = [];
        while (count($events) < $limit && ($line = fgets($file, 4097)) !== false) {
            if (! str_ends_with($line, "\n")) {
                break;
            }
            $offset = ftell($file);
            $event = json_decode($line, true);
            if (is_array($event)) {
                $events[] = $event;
            }
        }
        flock($file, LOCK_UN);
        fclose($file);

        return ['events' => $events, 'offset' => $offset];
    }

    public function acknowledge(int $offset): void
    {
        $this->store->meta('diagnostics_offset', $offset, true);
        $path = $this->store->directory.'/diagnostics.ndjson';
        $file = @fopen($path, 'c+b');
        if ($file !== false && flock($file, LOCK_EX | LOCK_NB)) {
            fseek($file, 0, SEEK_END);
            if (ftell($file) === $offset) {
                ftruncate($file, 0);
                $this->store->meta('diagnostics_offset', 0, true);
            }
            flock($file, LOCK_UN);
        }
        if (is_resource($file)) {
            fclose($file);
        }
    }

    public function ingest(): void
    {
        $batch = $this->batch();
        if ($batch === []) {
            return;
        }
        foreach ($batch['events'] as $event) {
            $this->accept($event);
        }
        $this->acknowledge($batch['offset']);
    }

    public function accept(array $event): bool
    {
        if (! preg_match('/^[a-f0-9]{32}$/', $event['run_id'] ?? '') || ! preg_match('/^[a-zA-Z0-9_-]{8,64}$/', $event['trace_id'] ?? '') || abs(time() - (int) ($event['timestamp'] ?? 0)) > 600) {
            return false;
        }
        $run = $this->store->query('SELECT config_json FROM storm_runs WHERE id = ?', [$event['run_id']])->fetchColumn();
        if (! $run || ! (json_decode($run, true)['diagnostics'] ?? false)) {
            return false;
        }
        $safe = array_intersect_key($event, array_flip(['schema_version', 'run_id', 'trace_id', 'timestamp', 'server_duration_ms', 'query_count', 'query_duration_ms', 'memory_delta_bytes', 'process_peak_memory_bytes', 'exception_class']));
        foreach (['server_duration_ms', 'query_count', 'query_duration_ms', 'memory_delta_bytes', 'process_peak_memory_bytes'] as $key) {
            if (! is_numeric($safe[$key] ?? null) || ! is_finite((float) $safe[$key])) {
                return false;
            }
        }
        if (isset($safe['exception_class']) && (! is_string($safe['exception_class']) || strlen($safe['exception_class']) > 200 || ! preg_match('/^[A-Za-z0-9_\\\\]+$/', $safe['exception_class']))) {
            return false;
        }
        $this->store->query('INSERT OR IGNORE INTO storm_diagnostic_samples (run_id, trace_id, data_json) SELECT ?, ?, ? WHERE (SELECT COUNT(*) FROM storm_diagnostic_samples WHERE run_id = ?) < 5000', [$event['run_id'], $event['trace_id'], Store::json($safe), $event['run_id']]);

        return true;
    }
}
