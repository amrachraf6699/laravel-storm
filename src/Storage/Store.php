<?php

namespace AmrAchraf\LaravelStorm\Storage;

use AmrAchraf\LaravelStorm\Data\RunStatus;
use PDO;
use RuntimeException;

final class Store
{
    private ?PDO $connection = null;

    public function __construct(public readonly string $directory) {}

    public function db(): PDO
    {
        if ($this->connection !== null) {
            return $this->connection;
        }
        if (! is_dir($this->directory) && ! mkdir($this->directory, 0700, true) && ! is_dir($this->directory)) {
            throw new RuntimeException('Cannot create Storm storage directory.');
        }
        $db = new PDO('sqlite:'.$this->directory.'/storm.sqlite', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        @chmod($this->directory.'/storm.sqlite', 0600);
        $db->exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
        $db->exec('CREATE TABLE IF NOT EXISTS storm_schema (version INTEGER PRIMARY KEY)');
        if (! $db->query('SELECT version FROM storm_schema WHERE version = 1')->fetch()) {
            $db->exec(file_get_contents(__DIR__.'/../../database/migrations/001_initial.sql'));
        }

        return $this->connection = $db;
    }

    public function query(string $sql, array $params = []): \PDOStatement
    {
        $query = $this->db()->prepare($sql);
        $query->execute($params);

        return $query;
    }

    public static function json(mixed $value): string
    {
        return json_encode($value, JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE | JSON_UNESCAPED_SLASHES);
    }

    public function create(array $config, int $maxActive): array
    {
        $db = $this->db();
        $db->exec('BEGIN IMMEDIATE');
        try {
            $active = (int) $this->query("SELECT COUNT(*) FROM storm_runs WHERE status IN ('pending','starting','running','stopping')")->fetchColumn();
            if ($active >= $maxActive) {
                throw new RuntimeException('Concurrent run limit reached. Stop or recover the active run first.');
            }
            $id = bin2hex(random_bytes(16));
            $this->query('INSERT INTO storm_runs (id, name, engine, status, config_json, created_at, nonce) VALUES (?, ?, ?, ?, ?, ?, ?)', [$id, $config['name'], $config['engine'], 'pending', self::json($config), gmdate('c'), bin2hex(random_bytes(16))]);
            $db->exec('COMMIT');
        } catch (\Throwable $e) {
            $db->exec('ROLLBACK');
            throw $e;
        }

        return $this->run($id);
    }

    public function run(string $id): array
    {
        $run = $this->query('SELECT * FROM storm_runs WHERE id = ?', [$id])->fetch();
        if (! $run) {
            throw new RuntimeException('Run not found.');
        }
        $run['configuration'] = json_decode($run['config_json'], true, 512, JSON_THROW_ON_ERROR);
        $run['report'] = $run['report_json'] ? json_decode($run['report_json'], true, 512, JSON_THROW_ON_ERROR) : null;
        unset($run['config_json'], $run['report_json']);

        return $run;
    }

    public function publicRun(array $run): array
    {
        unset($run['nonce'], $run['process_json']);

        return $run;
    }

    public function runs(int $limit = 50, int $offset = 0): array
    {
        $rows = $this->query('SELECT id FROM storm_runs ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?', [min(100, max(1, $limit)), max(0, $offset)])->fetchAll();

        return array_map(fn ($r) => $this->publicRun($this->run($r['id'])), $rows);
    }

    public function transition(string $id, RunStatus $to): bool
    {
        $from = RunStatus::from($this->run($id)['status']);
        if ($from === $to) {
            return true;
        }
        if (! $from->canTransitionTo($to)) {
            throw new RuntimeException("Invalid run transition: {$from->value} to {$to->value}.");
        }
        $extra = $to->terminal() ? ', finished_at = :at' : ($to === RunStatus::Running ? ', started_at = :at' : '');
        $params = ['to' => $to->value, 'id' => $id, 'from' => $from->value];
        if ($extra !== '') {
            $params['at'] = gmdate('c');
        }

        return $this->query('UPDATE storm_runs SET status = :to'.$extra.' WHERE id = :id AND status = :from', $params)->rowCount() === 1;
    }

    public function stop(string $id): void
    {
        $status = RunStatus::from($this->run($id)['status']);
        if ($status->terminal() || $status === RunStatus::Stopping) {
            return;
        }
        $this->transition($id, $status === RunStatus::Pending ? RunStatus::Cancelled : RunStatus::Stopping);
    }

    public function heartbeat(string $id): void
    {
        $this->query('UPDATE storm_runs SET heartbeat_at = ? WHERE id = ?', [microtime(true), $id]);
    }

    public function report(string $id, array $report): void
    {
        $this->query('UPDATE storm_runs SET report_json = ?, performance_outcome = ? WHERE id = ?', [self::json($report), $report['performance_outcome'], $id]);
    }

    public function bucket(string $id, int $second, array $bucket): void
    {
        $this->query('INSERT INTO storm_metric_buckets (run_id, elapsed_second, data_json) VALUES (?, ?, ?) ON CONFLICT(run_id, elapsed_second) DO UPDATE SET data_json=excluded.data_json', [$id, $second, self::json($bucket)]);
    }

    public function sample(string $id, array $sample, int $maxSamples): void
    {
        $this->query('INSERT INTO storm_request_samples (run_id, data_json) SELECT ?, ? WHERE (SELECT COUNT(*) FROM storm_request_samples WHERE run_id = ?) < ?', [$id, self::json($sample), $id, $maxSamples]);
    }

    public function metrics(string $id, int $after = -1, int $limit = 300): array
    {
        $rows = $this->query('SELECT data_json FROM storm_metric_buckets WHERE run_id = ? AND elapsed_second > ? ORDER BY elapsed_second LIMIT ?', [$id, $after, min(1000, max(1, $limit))])->fetchAll();

        return array_map(fn ($r) => json_decode($r['data_json'], true), $rows);
    }

    public function samples(string $id, int $after = 0, int $limit = 100): array
    {
        $rows = $this->query('SELECT id, data_json FROM storm_request_samples WHERE run_id = ? AND id > ? ORDER BY id LIMIT ?', [$id, $after, min(500, max(1, $limit))])->fetchAll();

        return array_map(fn ($r) => ['cursor' => (int) $r['id']] + json_decode($r['data_json'], true), $rows);
    }

    public function scenarios(): array
    {
        return array_map(fn ($r) => ['id' => $r['id'], 'configuration' => json_decode($r['config_json'], true)], $this->query('SELECT * FROM storm_scenarios ORDER BY updated_at DESC')->fetchAll());
    }

    public function saveScenario(array $config, ?string $id = null): string
    {
        $id ??= bin2hex(random_bytes(16));
        $this->query('INSERT INTO storm_scenarios (id, config_json, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET config_json=excluded.config_json, updated_at=excluded.updated_at', [$id, self::json($config), gmdate('c')]);

        return $id;
    }

    public function meta(string $key, mixed $value = null, bool $write = false): mixed
    {
        if ($write) {
            $this->query('INSERT INTO storm_meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value', [$key, self::json($value)]);

            return $value;
        }
        $result = $this->query('SELECT value FROM storm_meta WHERE key = ?', [$key])->fetchColumn();

        return $result === false ? null : json_decode($result, true);
    }

    public function prune(int $days): int
    {
        return $this->query("DELETE FROM storm_runs WHERE status IN ('completed','cancelled','failed') AND created_at < ?", [gmdate('c', time() - max(1, $days) * 86400)])->rowCount();
    }
}
