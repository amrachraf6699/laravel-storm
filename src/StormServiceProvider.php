<?php

namespace AmrAchraf\LaravelStorm;

use AmrAchraf\LaravelStorm\Commands\StormCommand;
use AmrAchraf\LaravelStorm\Diagnostics\QueryScope;
use AmrAchraf\LaravelStorm\Diagnostics\StormMiddleware;
use AmrAchraf\LaravelStorm\Engines\EngineRegistry;
use AmrAchraf\LaravelStorm\Runs\RunManager;
use AmrAchraf\LaravelStorm\Runs\Supervisor;
use AmrAchraf\LaravelStorm\Scenarios\ScenarioValidator;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use AmrAchraf\LaravelStorm\Storage\Store;
use Illuminate\Support\ServiceProvider;

final class StormServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/storm.php', 'storm');
        $this->app->singleton(Store::class, fn ($app) => new Store($app['config']['storm.storage_path']));
        $this->app->singleton(TargetPolicy::class, fn ($app) => new TargetPolicy($app['config']['storm.security']));
        $this->app->singleton(ScenarioValidator::class, fn ($app) => new ScenarioValidator($app['config']['storm.security'], $app->make(TargetPolicy::class)));
        $this->app->singleton(EngineRegistry::class, fn ($app) => new EngineRegistry($app['config']['storm'], $app->make(TargetPolicy::class)));
        $this->app->singleton(RunManager::class, fn ($app) => new RunManager($app->make(Store::class), $app->make(ScenarioValidator::class), $app->make(EngineRegistry::class), $app['config']['storm']));
        $this->app->bind(Supervisor::class, fn ($app) => new Supervisor($app->make(Store::class), $app['config']['storm'], $this->autoloadPath()));
        $this->app->bind(StormMiddleware::class, fn ($app) => new StormMiddleware($app->make(Store::class), $app['config']['storm']));
    }

    public function boot(): void
    {
        $this->publishes([__DIR__.'/../config/storm.php' => config_path('storm.php')], 'storm-config');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'storm');
        if ($this->app['config']['storm.enabled']) {
            $this->loadRoutesFrom(__DIR__.'/../routes/storm.php');
        }
        if ($this->app['config']['storm.diagnostics.enabled']) {
            $this->app['events']->listen('Illuminate\\Database\\Events\\QueryExecuted', function ($event) {
                if ($this->app->bound('request')) {
                    $scope = $this->app['request']->attributes->get('_storm_query_scope');
                    if ($scope instanceof QueryScope) {
                        $scope->query((float) $event->time);
                    }
                }
            });
        }
        if ($this->app->runningInConsole()) {
            $this->commands(array_map(fn ($name) => new StormCommand($name), StormCommand::NAMES));
        }
    }

    private function autoloadPath(): string
    {
        $host = base_path('vendor/autoload.php');
        if (is_file($host)) {
            return $host;
        }

        return __DIR__.'/../vendor/autoload.php';
    }
}
