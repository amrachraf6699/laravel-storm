<?php

namespace AmrAchraf\LaravelStorm\Http;

use AmrAchraf\LaravelStorm\Diagnostics\Spool;
use AmrAchraf\LaravelStorm\Engines\EngineRegistry;
use AmrAchraf\LaravelStorm\Reports\Reports;
use AmrAchraf\LaravelStorm\Runs\RunManager;
use AmrAchraf\LaravelStorm\Scenarios\ScenarioValidator;
use AmrAchraf\LaravelStorm\Security\Access;
use AmrAchraf\LaravelStorm\Storage\Store;
use AmrAchraf\LaravelStorm\Support\Doctor;
use Illuminate\Http\Request;

final class StormController
{
    public function __construct(private Store $store) {}

    public function login(Request $request, Access $access): mixed
    {
        abort_unless(config('storm.enabled'), 404);
        if ($access->allowed($request)) {
            return redirect()->route('storm.dashboard');
        }

        return response()->view('storm::login', ['local' => $access->isLocal($request)])->header('Cache-Control', 'no-store');
    }

    public function authenticate(Request $request, Access $access): mixed
    {
        abort_unless(config('storm.enabled'), 404);
        $request->validate(['token' => 'required|string|size:64']);
        abort_unless($access->exchange($request, $request->string('token')->toString()), 403);

        return redirect()->route('storm.dashboard');
    }

    public function dashboard(): mixed
    {
        return response()->view('storm::dashboard')->header('Cache-Control', 'no-store')->header('X-Frame-Options', 'DENY')->header('Referrer-Policy', 'no-referrer');
    }

    public function asset(string $file): mixed
    {
        abort_unless(in_array($file, ['storm.js', 'storm.css'], true), 404);

        return response()->file(__DIR__.'/../../dist/'.$file, ['Content-Type' => str_ends_with($file, '.js') ? 'text/javascript' : 'text/css', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function doctor(Doctor $doctor): array
    {
        return $doctor->report();
    }

    public function engines(EngineRegistry $engines): array
    {
        return $engines->capabilities();
    }

    public function scenarios(): array
    {
        return $this->store->scenarios();
    }

    public function saveScenario(Request $request, ScenarioValidator $validator, ?string $id = null): mixed
    {
        return $this->validated(function () use ($request, $validator, $id) {
            if ($id !== null && ! preg_match('/^[a-f0-9]{32}$/', $id)) {
                abort(404);
            }
            $config = $validator->validate($request->json()->all())->toArray();

            return ['id' => $this->store->saveScenario($config, $id), 'configuration' => $config];
        });
    }

    public function runs(Request $request): array
    {
        return $this->store->runs(50, max(0, (int) $request->query('offset', '0')));
    }

    public function start(Request $request, RunManager $manager): mixed
    {
        if (microtime(true) - ($this->store->meta('supervisor_heartbeat') ?? 0) > 5) {
            return response()->json(['message' => 'Start php artisan storm:serve before launching dashboard runs.'], 503);
        }

        return $this->validated(fn () => response()->json($this->store->publicRun($manager->create($request->json()->all())), 201));
    }

    public function run(string $id): array
    {
        return $this->store->publicRun($this->find($id));
    }

    public function stop(string $id, RunManager $manager): array
    {
        $this->find($id);
        $manager->stop($id);

        return $this->run($id);
    }

    public function metrics(string $id, Request $request): array
    {
        $this->find($id);

        return $this->store->metrics($id, (int) $request->query('after', '-1'));
    }

    public function samples(string $id, Request $request): array
    {
        $this->find($id);
        $samples = $this->store->samples($id, (int) $request->query('after', '0'));
        foreach ($samples as &$sample) {
            if (isset($sample['trace_id'])) {
                $value = $this->store->query('SELECT data_json FROM storm_diagnostic_samples WHERE run_id = ? AND trace_id = ?', [$id, $sample['trace_id']])->fetchColumn();
                $sample['diagnostics'] = $value ? json_decode($value, true) : null;
            }
        }
        unset($sample);

        return $samples;
    }

    public function report(string $id, Request $request, Reports $reports): mixed
    {
        $report = $this->find($id)['report'];
        abort_if($report === null, 409, 'Report is not available yet.');
        if ($request->query('format') === 'html') {
            return response($reports->html($report))->header('Content-Type', 'text/html; charset=UTF-8')->header('Content-Disposition', 'attachment; filename="storm-'.$id.'.html"')->header('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
        }

        return response()->json($report)->header('Cache-Control', 'no-store');
    }

    public function compare(string $left, string $right, Reports $reports): array
    {
        $a = $this->find($left)['report'];
        $b = $this->find($right)['report'];
        abort_if($a === null || $b === null, 409, 'Both runs need reports.');

        return $reports->compare($a, $b);
    }

    public function diagnostics(Request $request): mixed
    {
        $key = config('storm.diagnostics.key');
        $timestamp = $request->header('X-Storm-Timestamp', '');
        abort_unless(is_string($key) && strlen($key) >= 32 && ctype_digit($timestamp) && abs(time() - (int) $timestamp) <= 60 && strlen($request->getContent()) <= 524288, 403);
        $expected = hash_hmac('sha256', $timestamp.'.'.$request->getContent(), $key);
        abort_unless(hash_equals($expected, $request->header('X-Storm-Signature', '')), 403);
        $events = $request->json()->all()['events'] ?? [];
        abort_unless(is_array($events) && count($events) <= 100, 422);
        $spool = new Spool($this->store, config('storm.diagnostics'));
        $accepted = 0;
        foreach ($events as $event) {
            if (is_array($event) && $spool->accept($event)) {
                $accepted++;
            }
        }

        return response()->json(['accepted' => $accepted]);
    }

    private function find(string $id): array
    {
        abort_unless((bool) preg_match('/^[a-f0-9]{32}$/', $id), 404);
        try {
            return $this->store->run($id);
        } catch (\RuntimeException) {
            abort(404);
        }
    }

    private function validated(callable $operation): mixed
    {
        try {
            return $operation();
        } catch (\InvalidArgumentException|\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        } catch (\TypeError) {
            return response()->json(['message' => 'Malformed scenario configuration.'], 422);
        }
    }
}
