<?php

namespace AmrAchraf\LaravelStorm\Runs;

use AmrAchraf\LaravelStorm\Data\RunStatus;
use AmrAchraf\LaravelStorm\Diagnostics\Spool;
use AmrAchraf\LaravelStorm\Reports\RecoveryReport;
use AmrAchraf\LaravelStorm\Storage\Store;
use RuntimeException;
use Symfony\Component\Process\Process;

final class Supervisor
{
    private array $children = [];

    private bool $shutdown = false;

    public function __construct(private Store $store, private array $settings, private string $autoload) {}

    public function requestShutdown(): void
    {
        $this->shutdown = true;
    }

    public function loop(?string $onlyRun = null, ?callable $progress = null): void
    {
        $lock = fopen($this->store->directory.'/supervisor.lock', 'c');
        if ($lock === false || ! flock($lock, LOCK_EX | LOCK_NB)) {
            throw new RuntimeException('Another Storm supervisor is already running.');
        }
        try {
            while (true) {
                $this->store->meta('supervisor_heartbeat', microtime(true), true);
                $this->poll($onlyRun);
                (new Spool($this->store, $this->settings['diagnostics']))->ingest();
                if ($progress !== null) {
                    $progress();
                }
                if ($onlyRun !== null && RunStatus::from($this->store->run($onlyRun)['status'])->terminal()) {
                    break;
                }
                if ($this->shutdown) {
                    foreach ($this->children as $id => $_) {
                        $this->store->stop($id);
                    }
                    if ($this->children === []) {
                        break;
                    }
                }
                usleep(100000);
            }
        } finally {
            foreach ($this->children as $id => $child) {
                $this->store->stop($id);
                $child['process']->stop(3);
            }
            $this->store->meta('supervisor_heartbeat', 0, true);
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }

    private function poll(?string $onlyRun): void
    {
        foreach ($this->children as $id => $child) {
            $process = $child['process'];
            $process->clearOutput();
            $process->clearErrorOutput();
            $run = $this->store->run($id);
            $age = microtime(true) - $child['started'];
            if ($run['status'] === 'stopping') {
                $this->children[$id]['stop_at'] ??= microtime(true);
                if (microtime(true) - $this->children[$id]['stop_at'] > 5) {
                    $this->stopOwnedChildren($run);
                    $process->stop(1);
                }
            }
            $maxDuration = $run['configuration']['workload']['duration'] + 75;
            if ($age > $maxDuration || ($age > 20 && microtime(true) - ($run['heartbeat_at'] ?? 0) > 15)) {
                $this->stopOwnedChildren($run);
                $process->stop(1);
            }
            if (! $process->isRunning()) {
                $current = RunStatus::from($this->store->run($id)['status']);
                if (! $current->terminal()) {
                    if ($run['report'] === null) {
                        RecoveryReport::persist($this->store, $run, 'worker_exited');
                    }
                    $this->store->query('UPDATE storm_runs SET error_code = ? WHERE id = ?', ['worker_exited', $id]);
                    $this->store->transition($id, $current === RunStatus::Stopping ? RunStatus::Cancelled : RunStatus::Failed);
                }
                unset($this->children[$id]);
            }
        }
        if ($this->shutdown || count($this->children) >= $this->settings['security']['max_concurrent_runs']) {
            return;
        }
        $sql = "SELECT id FROM storm_runs WHERE status = 'pending'".($onlyRun ? ' AND id = ?' : '').' ORDER BY created_at LIMIT 1';
        $row = $this->store->query($sql, $onlyRun ? [$onlyRun] : [])->fetch();
        if (! $row || ! $this->store->transition($row['id'], RunStatus::Starting)) {
            return;
        }
        $run = $this->store->run($row['id']);
        $environment = [];
        preg_match_all('/\{\{env\.([A-Z_][A-Z0-9_]*)\}\}/', Store::json($run['configuration']), $matches);
        foreach (array_unique($matches[1]) as $name) {
            $value = $_ENV[$name] ?? $_SERVER[$name] ?? getenv($name);
            if ($value === false || ! is_scalar($value)) {
                $this->store->query('UPDATE storm_runs SET error_code = ? WHERE id = ?', ['missing_environment_reference', $run['id']]);
                $this->store->transition($run['id'], RunStatus::Failed);

                return;
            }
            $environment[$name] = (string) $value;
        }
        $manifest = ['settings' => $this->settings, 'environment' => $environment];
        $process = new Process([PHP_BINARY, __DIR__.'/../../bin/storm-worker.php', $this->autoload, $run['id'], $run['nonce']]);
        $process->setTimeout(null);
        $process->setInput(Store::json($manifest));
        if (PHP_OS_FAMILY === 'Windows') {
            $process->setOptions(['create_new_console' => false, 'create_process_group' => true]);
        }
        $process->start();
        $this->store->heartbeat($run['id']);
        $identity = (new ProcessIdentity)->inspect((int) $process->getPid());
        if ($identity !== null) {
            $identity['marker'] = $run['nonce'];
            $this->store->query('UPDATE storm_runs SET process_json = ? WHERE id = ?', [Store::json(['worker' => $identity]), $run['id']]);
        }
        $this->children[$run['id']] = ['process' => $process, 'started' => microtime(true)];
    }

    private function stopOwnedChildren(array $run): void
    {
        foreach (json_decode($run['process_json'] ?? '{}', true) as $kind => $identity) {
            if ($kind !== 'worker' && isset($identity['marker'])) {
                (new ProcessIdentity)->terminate($identity, $identity['marker']);
            }
        }
    }
}
