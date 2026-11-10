<?php

use AmrAchraf\LaravelStorm\StormServiceProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([StormServiceProvider::class])
    ->withRouting(web: __DIR__.'/../routes/web.php')
    ->withMiddleware(function (Middleware $middleware) {})
    ->withExceptions(function (Exceptions $exceptions) {})
    ->create();
