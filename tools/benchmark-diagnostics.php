<?php

declare(strict_types=1);

use AmrAchraf\LaravelStorm\Diagnostics\SignedContext;
use AmrAchraf\LaravelStorm\Diagnostics\StormMiddleware;
use AmrAchraf\LaravelStorm\Storage\Store;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../workbench/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();
$app['config']->set('database.default', 'benchmark');
$app['config']->set('database.connections.benchmark', ['driver' => 'sqlite', 'database' => ':memory:', 'prefix' => '']);
$app['events']->listen(QueryExecuted::class, function ($event) use ($app) {
    $scope = $app['request']->attributes->get('_storm_query_scope');
    $scope?->query($event->time);
});
DB::select('select 1');
$settings = config('storm');
$settings['diagnostics']['key'] = bin2hex(random_bytes(32));
$settings['diagnostics']['enabled'] = true;
$settings['diagnostics']['max_spool_bytes'] = 10485760;
$directory = __DIR__.'/../.cache/benchmarks/'.bin2hex(random_bytes(8));
$store = new Store($directory);
$store->db();
$middleware = new StormMiddleware($store, $settings);
$iterations = 2000;
$trials = [];
for ($trial = 0; $trial < 5; $trial++) {
    foreach ([false, true] as $instrumented) {
        $started = hrtime(true);
        for ($i = 0; $i < $iterations; $i++) {
            $request = Request::create('/fixture');
            $app->instance('request', $request);
            if ($instrumented && $i % 100 === 0) {
                $request->headers->set('X-Storm-Context', SignedContext::issue(str_repeat('a', 32), bin2hex(random_bytes(8)), $settings['diagnostics']['key']));
            }
            $middleware->handle($request, function () {
                DB::select('select 1');

                return response()->json(['ok' => true]);
            });
        }
        $trials[$trial][$instrumented ? 'sampled_1_percent_ms' : 'unsigned_ms'] = (hrtime(true) - $started) / 1e6;
    }
}
$baseline = array_column($trials, 'unsigned_ms');
$sampled = array_column($trials, 'sampled_1_percent_ms');
sort($baseline);
sort($sampled);
$result = ['kind' => 'in-process middleware microbenchmark; not an HTTP capacity benchmark', 'date_utc' => gmdate('c'), 'php' => PHP_VERSION, 'laravel' => $app->version(), 'os' => PHP_OS_FAMILY, 'iterations_per_trial' => $iterations, 'trials' => $trials, 'median_unsigned_ms' => $baseline[2], 'median_sampled_ms' => $sampled[2], 'median_overhead_percent' => ($sampled[2] / $baseline[2] - 1) * 100, 'caveats' => ['SQLite in-memory fixture query; Laravel kernel/network/proxy excluded.', 'Unsigned requests are compared with 1% signed sampled requests; sampling/signing included.', 'Single host, five trials, no claim of statistical significance. Repeat in your deployment.']];
echo json_encode($result, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR)."\n";
