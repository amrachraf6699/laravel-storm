<?php

namespace AmrAchraf\LaravelStorm\Http;

use AmrAchraf\LaravelStorm\Security\Access;
use Closure;
use Illuminate\Http\Request;

final class Authorize
{
    public function __construct(private Access $access) {}

    public function handle(Request $request, Closure $next): mixed
    {
        abort_unless(config('storm.enabled'), 404);
        if (! $this->access->allowed($request)) {
            return $request->expectsJson() ? response()->json(['message' => 'Storm authorization required.'], 403) : redirect()->route('storm.login');
        }

        return $next($request);
    }
}
