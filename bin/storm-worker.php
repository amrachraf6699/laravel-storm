<?php

// Internal supervised entrypoint. Credentials arrive through stdin, never argv/files.
declare(strict_types=1);

use AmrAchraf\LaravelStorm\Data\RunConfiguration;
use AmrAchraf\LaravelStorm\Data\RunStatus;
use AmrAchraf\LaravelStorm\Engines\EngineRegistry;
use AmrAchraf\LaravelStorm\Runs\RunContext;
use AmrAchraf\LaravelStorm\Security\Redactor;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use AmrAchraf\LaravelStorm\Storage\Store;

require $argv[1];
$manifest = json_decode(stream_get_contents(STDIN), true, 512, JSON_THROW_ON_ERROR);
$settings = $manifest['settings'];
ini_set('memory_limit', $settings['security']['max_worker_memory_mb'].'M');
$store = new Store($settings['storage_path']);
$run = $store->run($argv[2]);
if (! hash_equals($run['nonce'], $argv[3]) || $run['status'] !== 'starting') {
    exit(1);
}
$configuration = new RunConfiguration($run['configuration']);
$context = new RunContext($run['id'], $store, $configuration, $settings, new Redactor($settings['capture']), $manifest['environment']);
try {
    $store->transition($run['id'], RunStatus::Running);
    $context->tick(true);
    $registry = new EngineRegistry($settings, new TargetPolicy($settings['security']));
    $registry->get($configuration->engine())->execute($configuration, $context);
    $cancelled = $context->shouldStop();
    $context->finish($cancelled);
    $store->transition($run['id'], $cancelled ? RunStatus::Cancelled : RunStatus::Completed);
} catch (Throwable $exception) {
    // Exception strings can contain HTTP credentials/URLs. Store a stable category only.
    $context->finish(true, 'engine_execution_error');
    $store->query('UPDATE storm_runs SET error_code = ? WHERE id = ?', ['engine_execution_error', $run['id']]);
    $current = RunStatus::from($store->run($run['id'])['status']);
    if (! $current->terminal()) {
        $store->transition($run['id'], RunStatus::Failed);
    }
    exit(1);
}
