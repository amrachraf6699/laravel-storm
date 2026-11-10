<?php

namespace AmrAchraf\LaravelStorm\Runs;

use AmrAchraf\LaravelStorm\Data\RunStatus;
use AmrAchraf\LaravelStorm\Engines\EngineRegistry;
use AmrAchraf\LaravelStorm\Reports\RecoveryReport;
use AmrAchraf\LaravelStorm\Scenarios\ScenarioValidator;
use AmrAchraf\LaravelStorm\Storage\Store;
use RuntimeException;

final class RunManager
{
    public function __construct(private Store $store, private ScenarioValidator $validator, private EngineRegistry $engines, private array $settings) {}

    public function create(array $input): array
    {
        if (! $this->settings['enabled']) {
            throw new RuntimeException('Storm is disabled. Set STORM_ENABLED=true explicitly.');
        }
        $configuration = $this->validator->validate($input);
        $capabilities = $this->engines->get($configuration->engine())->capabilities();
        if (! $capabilities->available) {
            throw new RuntimeException($capabilities->reason ?? 'Engine is unavailable.');
        }
        if ($configuration->data['capture'] && ! $this->settings['capture']['enabled']) {
            throw new RuntimeException('Body capture requires explicit configuration and field allowlists.');
        }
        if ($configuration->data['diagnostics'] && ! ($this->settings['diagnostics']['key'] ?? null)) {
            throw new RuntimeException('Diagnostics require a shared signing key.');
        }

        return $this->store->create($configuration->toArray(), $this->settings['security']['max_concurrent_runs']);
    }

    public function stop(string $id): void
    {
        $this->store->stop($id);
    }

    public function recover(): int
    {
        $recovered = 0;
        $identity = new ProcessIdentity;
        foreach ($this->store->query("SELECT id FROM storm_runs WHERE status IN ('starting','running','stopping')")->fetchAll() as $row) {
            $run = $this->store->run($row['id']);
            if (microtime(true) - ($run['heartbeat_at'] ?? 0) < 15) {
                continue;
            }
            $processes = json_decode($run['process_json'] ?? '{}', true);
            foreach ($processes as $process) {
                if (is_array($process) && isset($process['marker'])) {
                    $identity->terminate($process, $process['marker']);
                }
            }
            $this->store->query('UPDATE storm_runs SET error_code = ? WHERE id = ?', ['interrupted_worker', $run['id']]);
            if ($run['report'] === null) {
                RecoveryReport::persist($this->store, $run, 'interrupted_worker');
            }
            $this->store->transition($run['id'], RunStatus::Failed);
            $recovered++;
        }

        return $recovered;
    }
}
