<?php

namespace AmrAchraf\LaravelStorm\Diagnostics;

use AmrAchraf\LaravelStorm\Storage\Store;
use Closure;
use Illuminate\Http\Request;

final class StormMiddleware
{
    public function __construct(private Store $store, private array $settings) {}

    public function handle(Request $request, Closure $next): mixed
    {
        $settings = $this->settings['diagnostics'];
        $token = $request->header('X-Storm-Context', '');
        if (! $settings['enabled'] || ! is_string($settings['key']) || ($context = SignedContext::verify($token, $settings['key'])) === null) {
            return $next($request);
        }
        // Attribute belongs to this request, including in Octane / persistent workers.
        $scope = new QueryScope;
        $request->attributes->set('_storm_query_scope', $scope);
        $began = hrtime(true);
        $memory = memory_get_usage(true);
        $exception = null;
        try {
            $response = $next($request);
            if (isset($response->exception)) {
                $exception = get_class($response->exception);
            }

            return $response;
        } catch (\Throwable $error) {
            $exception = get_class($error);
            throw $error;
        } finally {
            $request->attributes->remove('_storm_query_scope');
            $event = ['schema_version' => 1, 'run_id' => $context['run_id'], 'trace_id' => $context['trace_id'], 'timestamp' => time(), 'server_duration_ms' => (hrtime(true) - $began) / 1e6, 'query_count' => $scope->count, 'query_duration_ms' => $scope->milliseconds, 'memory_delta_bytes' => memory_get_usage(true) - $memory, 'process_peak_memory_bytes' => memory_get_peak_usage(true), 'exception_class' => $exception];
            // Diagnostics must never break the application request.
            try {
                (new Spool($this->store, $settings))->append($event);
            } catch (\Throwable) {
                // Quotas / unavailable storage drop diagnostic samples only.
            }
        }
    }
}
