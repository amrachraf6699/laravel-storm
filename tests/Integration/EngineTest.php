<?php

namespace AmrAchraf\LaravelStorm\Tests\Integration;

use AmrAchraf\LaravelStorm\Data\RunStatus;
use AmrAchraf\LaravelStorm\Engines\EngineRegistry;
use AmrAchraf\LaravelStorm\Runs\RunManager;
use AmrAchraf\LaravelStorm\Runs\Supervisor;
use AmrAchraf\LaravelStorm\Scenarios\ScenarioValidator;
use AmrAchraf\LaravelStorm\Security\TargetPolicy;
use AmrAchraf\LaravelStorm\Storage\Store;
use AmrAchraf\LaravelStorm\Tests\Support\FixtureServer;
use AmrAchraf\LaravelStorm\Tests\Support\Settings;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class EngineTest extends TestCase
{
    private FixtureServer $fixture;

    private Store $store;

    private array $settings;

    protected function setUp(): void
    {
        $this->fixture = new FixtureServer;
        $this->settings = Settings::make(__DIR__.'/../../.cache/tests/'.bin2hex(random_bytes(8)), $this->fixture->origin);
        $this->store = new Store($this->settings['storage_path']);
        $this->store->db();
    }

    protected function tearDown(): void
    {
        $this->fixture->process->stop(1);
    }

    private function manager(): RunManager
    {
        $targets = new TargetPolicy($this->settings['security']);

        return new RunManager($this->store, new ScenarioValidator($this->settings['security'], $targets), new EngineRegistry($this->settings, $targets), $this->settings);
    }

    private function execute(array $input, ?callable $progress = null): array
    {
        $run = $this->manager()->create($input);
        (new Supervisor($this->store, $this->settings, __DIR__.'/../../vendor/autoload.php'))->loop($run['id'], $progress);

        return $this->store->run($run['id']);
    }

    public function test_php_request_counts_match_target_and_metrics_survive_reopening(): void
    {
        $run = $this->execute(Settings::scenario($this->fixture->origin));
        self::assertSame('completed', $run['status'], json_encode($run));
        $actual = $this->fixture->stats()['/fast'];
        self::assertGreaterThan(3, $actual);
        self::assertSame($actual, $run['report']['summary']['completed_requests']);
        self::assertSame($actual, $run['report']['summary']['started_requests']);
        self::assertSame(0, $run['report']['summary']['transport_errors']);
        self::assertSame('passed', $run['performance_outcome']);
        self::assertSame($actual, (new Store($this->settings['storage_path']))->run($run['id'])['report']['summary']['completed_requests']);
    }

    public function test_transport_failures_and_http_errors_have_independent_counts(): void
    {
        $input = Settings::scenario($this->fixture->origin, '/timeout');
        $input['steps'][0]['timeout'] = .05;
        $run = $this->execute($input);
        self::assertSame('completed', $run['status']);
        self::assertGreaterThan(0, $run['report']['summary']['timeouts']);
        self::assertSame(0, $run['report']['summary']['http_responses']);
        $input = Settings::scenario($this->fixture->origin, '/fail');
        $input['thresholds'] = [['metric' => 'http_error_rate', 'operator' => 'lt', 'value' => .01]];
        $run = $this->execute($input);
        self::assertSame('completed', $run['status']);
        self::assertSame('failed', $run['performance_outcome']);
        self::assertSame(1, $run['report']['summary']['http_error_rate']);
    }

    public function test_redirects_are_not_followed_and_large_responses_are_bounded(): void
    {
        $run = $this->execute(Settings::scenario($this->fixture->origin, '/redirect'));
        self::assertSame('completed', $run['status']);
        self::assertArrayHasKey(302, $run['report']['summary']['statuses']);
        $run = $this->execute(Settings::scenario($this->fixture->origin, '/large'));
        self::assertSame('completed', $run['status']);
        self::assertGreaterThan(0, $run['report']['summary']['transport_errors']);
    }

    public function test_cancellation_preserves_partial_report_and_stop_is_idempotent(): void
    {
        $input = Settings::scenario($this->fixture->origin, '/slow');
        $input['workload']['duration'] = 20;
        $began = microtime(true);
        $run = $this->execute($input, function () use ($began) {
            if (microtime(true) - $began > 2) {
                $id = $this->store->runs()[0]['id'];
                $this->store->stop($id);
                $this->store->stop($id);
            }
        });
        self::assertSame('cancelled', $run['status']);
        self::assertTrue($run['report']['partial']);
        self::assertLessThan(10, microtime(true) - $began);
    }

    public static function engines(): array
    {
        return [['php'], ['k6']];
    }

    #[DataProvider('engines')]
    public function test_login_journey_isolates_vu_state_and_never_persists_credentials(string $engine): void
    {
        if ($engine === 'k6' && ! (new EngineRegistry($this->settings, new TargetPolicy($this->settings['security'])))->get('k6')->capabilities()->available) {
            self::assertFalse((bool) getenv('STORM_REQUIRE_K6'), 'CI requires the verified k6 executable.');
            self::markTestSkipped('Verified k6 2.3.0 is not installed.');
        }
        $_ENV['STORM_FIXTURE_PASSWORD'] = 'super-secret-fixture-password';
        $this->settings['capture']['enabled'] = true;
        $input = Settings::scenario($this->fixture->origin);
        $input['engine'] = $engine;
        $input['capture'] = true;
        $input['workload']['duration'] = 1.2;
        $input['steps'] = [
            ['name' => 'csrf', 'path' => '/login', 'extract' => ['csrf' => ['source' => 'css', 'path' => 'input[name="_token"]', 'attribute' => 'value']]],
            ['name' => 'login', 'path' => '/login', 'method' => 'POST', 'form' => ['_token' => '{{csrf}}', 'password' => '{{env.STORM_FIXTURE_PASSWORD}}']],
            ['name' => 'order', 'path' => '/orders', 'method' => 'POST', 'json' => ['product_id' => 1], 'expected_status' => [201], 'extract' => ['orderId' => ['source' => 'json', 'path' => 'id']]],
        ];
        $run = $this->execute($input);
        unset($_ENV['STORM_FIXTURE_PASSWORD']);
        self::assertSame('completed', $run['status'], json_encode($run));
        self::assertSame(0, $run['report']['summary']['unexpected_statuses'], json_encode($run));
        self::assertGreaterThan(0, $this->fixture->stats()['/orders'] ?? 0);
        self::assertNotEmpty($this->store->samples($run['id']), 'The request inspector needs actual engine samples.');
        $records = Store::json($this->store->runs()).Store::json($this->store->samples($run['id']));
        self::assertStringNotContainsString('super-secret-fixture-password', $records);
        self::assertStringNotContainsString('never capture this', $records);
    }

    public function test_k6_arrival_rate_reports_target_counts(): void
    {
        if (! (new EngineRegistry($this->settings, new TargetPolicy($this->settings['security'])))->get('k6')->capabilities()->available) {
            self::assertFalse((bool) getenv('STORM_REQUIRE_K6'), 'CI requires the verified k6 executable.');
            self::markTestSkipped('Verified k6 2.3.0 is not installed.');
        }
        $input = Settings::scenario($this->fixture->origin);
        $input['engine'] = 'k6';
        $input['workload'] = ['mode' => 'constant-arrival-rate', 'rate' => 5, 'duration' => 1, 'vus' => 2, 'max_vus' => 5];
        $run = $this->execute($input);
        self::assertSame('completed', $run['status'], json_encode($run));
        self::assertSame($this->fixture->stats()['/fast'], $run['report']['summary']['completed_requests']);
        self::assertGreaterThan(4, $run['report']['summary']['completed_rps']);
        self::assertLessThan(7, $run['report']['summary']['completed_rps']);
    }

    public function test_stale_workers_recover_without_killing_unrelated_processes(): void
    {
        $run = $this->manager()->create(Settings::scenario($this->fixture->origin));
        $this->store->transition($run['id'], RunStatus::Starting);
        $this->store->query('UPDATE storm_runs SET heartbeat_at = 0, process_json = ? WHERE id = ?', ['{"worker":{"pid":99999999,"birth":"wrong","marker":"foreign"}}', $run['id']]);
        self::assertSame(1, $this->manager()->recover());
        self::assertSame('failed', $this->store->run($run['id'])['status']);
        self::assertTrue($this->store->run($run['id'])['report']['partial']);
    }

    public static function rampEngines(): array
    {
        return [['php', 'ramping-vus'], ['php', 'spike'], ['k6', 'ramping-vus'], ['k6', 'spike'], ['k6', 'ramping-arrival-rate']];
    }

    #[DataProvider('rampEngines')]
    public function test_ramp_and_spike_modes_preserve_counts_and_stage_windows(string $engine, string $mode): void
    {
        if ($engine === 'k6' && ! (new EngineRegistry($this->settings, new TargetPolicy($this->settings['security'])))->get('k6')->capabilities()->available) {
            self::assertFalse((bool) getenv('STORM_REQUIRE_K6'), 'CI requires k6.');
            self::markTestSkipped('Verified k6 is not installed.');
        }
        $input = Settings::scenario($this->fixture->origin);
        $input['engine'] = $engine;
        $input['workload'] = ['mode' => $mode, 'duration' => 1, 'vus' => 1, 'max_vus' => 3, 'rate' => 2, 'rps_limit' => 20, 'stages' => [['duration' => .5, 'target' => 3], ['duration' => .5, 'target' => 2]]];
        $run = $this->execute($input);
        self::assertSame('completed', $run['status'], json_encode($run));
        self::assertSame($this->fixture->stats()['/fast'] ?? 0, $run['report']['summary']['completed_requests']);
        self::assertNotEmpty($run['report']['stages']);
        self::assertNotNull($run['report']['last_passing_tested_stage']);
        self::assertLessThanOrEqual($run['report']['summary']['completed_requests'], $run['report']['summary']['samples_retained'] + $run['report']['summary']['samples_dropped']);
    }
}
