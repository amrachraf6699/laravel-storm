<?php

namespace AmrAchraf\LaravelStorm\Tests\Feature;

use AmrAchraf\LaravelStorm\Diagnostics\SignedContext;
use AmrAchraf\LaravelStorm\Diagnostics\Spool;
use AmrAchraf\LaravelStorm\Diagnostics\StormMiddleware;
use AmrAchraf\LaravelStorm\Runs\RunManager;
use AmrAchraf\LaravelStorm\Security\Access;
use AmrAchraf\LaravelStorm\Storage\Store;
use AmrAchraf\LaravelStorm\StormServiceProvider;
use AmrAchraf\LaravelStorm\Tests\Support\Settings;
use Illuminate\Auth\GenericUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Orchestra\Testbench\TestCase;

final class PackageTest extends TestCase
{
    protected function getPackageProviders($app): array
    {
        return [StormServiceProvider::class];
    }

    protected function defineEnvironment($app): void
    {
        $settings = Settings::make(__DIR__.'/../../.cache/feature/'.bin2hex(random_bytes(8)));
        $settings['path'] = 'storm';
        $settings['middleware'] = ['web'];
        $settings['diagnostics']['enabled'] = true;
        $app['config']->set('storm', $settings);
        $app['config']->set('app.key', 'base64:Ji+9EgB1r0wmOYpQwEfCSni+3EyW8w6yCDSKxPLLeMc=');
        $app['config']->set('session.driver', 'array');
        $app['config']->set('cache.default', 'array');
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', ['driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '']);
    }

    public function test_package_boots_and_endpoints_require_authorization(): void
    {
        $this->get('/storm')->assertRedirect('/storm/login');
        foreach (['runs', 'doctor', 'scenarios', 'engines'] as $path) {
            $this->getJson('/storm/api/'.$path)->assertForbidden();
        }
        $this->postJson('/storm/api/runs', Settings::scenario())->assertForbidden();
        $this->get('/storm/login')->assertOk()->assertSee('single-use token');
        $this->get('/storm/assets/../composer.json')->assertNotFound();
    }

    public function test_local_login_token_is_single_use_and_session_authorizes_dashboard(): void
    {
        $token = app(Access::class)->issue();
        $this->withServerVariables(['REMOTE_ADDR' => '127.0.0.1'])->post('/storm/login', ['token' => $token])->assertRedirect('/storm');
        $this->get('/storm')->assertOk()->assertSee('Laravel Storm');
        $this->getJson('/storm/api/doctor')->assertOk()->assertJsonPath('supervisor_online', false);
        $this->post('/storm/login', ['token' => $token])->assertForbidden();
    }

    public function test_remote_or_staging_cannot_use_local_token_bypass(): void
    {
        $token = app(Access::class)->issue();
        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.10'])->post('/storm/login', ['token' => $token])->assertForbidden();
        $this->getJson('/storm/api/runs')->assertForbidden();
        $this->actingAs(new GenericUser(['id' => 1, 'name' => 'Developer']));
        $this->getJson('/storm/api/runs')->assertForbidden();
        Gate::define('viewStorm', fn ($user) => $user->id === 1);
        $this->getJson('/storm/api/runs')->assertOk();
    }

    public function test_csrf_is_enforced_outside_the_test_environment(): void
    {
        $this->app->instance('env', 'local');
        $this->withServerVariables(['REMOTE_ADDR' => '127.0.0.1'])->postJson('/storm/login', ['token' => app(Access::class)->issue()])->assertStatus(419);
    }

    public function test_dashboard_detects_missing_worker_and_validates_saved_scenarios(): void
    {
        Gate::define('viewStorm', fn () => true);
        $this->actingAs(new GenericUser(['id' => 1]));
        $this->postJson('/storm/api/runs', Settings::scenario())->assertStatus(503);
        $this->postJson('/storm/api/scenarios', Settings::scenario())->assertOk()->assertJsonPath('configuration.schema_version', 1);
        $bad = Settings::scenario();
        $bad['origin'] = 'https://unapproved.example';
        $this->postJson('/storm/api/scenarios', $bad)->assertStatus(422);
        $this->getJson('/storm/api/runs/../../etc/passwd')->assertNotFound();
    }

    public function test_diagnostics_are_signed_and_request_state_does_not_leak(): void
    {
        Route::middleware(StormMiddleware::class)->get('/diagnostic-fixture', function () {
            DB::select('select 1');

            return response()->json(['ok' => true]);
        });
        $input = Settings::scenario();
        $input['diagnostics'] = true;
        $run = app(RunManager::class)->create($input);
        $key = config('storm.diagnostics.key');
        $this->withHeader('X-Storm-Context', 'forged')->get('/diagnostic-fixture')->assertOk();
        $this->withHeader('X-Storm-Context', SignedContext::issue($run['id'], 'trace_first', $key))->get('/diagnostic-fixture')->assertOk();
        $this->withHeader('X-Storm-Context', SignedContext::issue($run['id'], 'trace_second', $key))->get('/diagnostic-fixture')->assertOk();
        $store = app(Store::class);
        (new Spool($store, config('storm.diagnostics')))->ingest();
        $rows = $store->query('SELECT data_json FROM storm_diagnostic_samples ORDER BY trace_id')->fetchAll();
        self::assertCount(2, $rows);
        foreach ($rows as $row) {
            self::assertSame(1, json_decode($row['data_json'], true)['query_count']);
            self::assertStringNotContainsString('select 1', $row['data_json']);
        }
        $this->postJson('/storm/api/diagnostics', ['events' => []])->assertForbidden();
    }

    public function test_cli_commands_and_dedicated_sqlite_storage(): void
    {
        $this->artisan('storm:doctor', ['--json' => true])->assertSuccessful();
        $this->artisan('storm:serve', ['--once' => true])->assertSuccessful();
        self::assertFileExists(config('storm.storage_path').'/storm.sqlite');
        self::assertSame('wal', app(Store::class)->query('PRAGMA journal_mode')->fetchColumn());
        self::assertSame([], DB::select("SELECT name FROM sqlite_master WHERE name LIKE 'storm_%'"));
    }
}
