<?php

use AmrAchraf\LaravelStorm\Http\Authorize;
use AmrAchraf\LaravelStorm\Http\StormController;
use Illuminate\Support\Facades\Route;

Route::prefix(config('storm.path', 'storm'))->name('storm.')->group(function () {
    Route::post('api/diagnostics', [StormController::class, 'diagnostics'])->name('diagnostics');
    Route::middleware(config('storm.middleware', ['web']))->group(function () {
        Route::get('login', [StormController::class, 'login'])->name('login');
        Route::post('login', [StormController::class, 'authenticate'])->middleware('throttle:10,1')->name('authenticate');
        Route::get('assets/{file}', [StormController::class, 'asset'])->where('file', 'storm\.(js|css)')->name('asset');
        Route::middleware(Authorize::class)->group(function () {
            Route::get('/', [StormController::class, 'dashboard'])->name('dashboard');
            Route::get('api/doctor', [StormController::class, 'doctor']);
            Route::get('api/engines', [StormController::class, 'engines']);
            Route::get('api/scenarios', [StormController::class, 'scenarios']);
            Route::post('api/scenarios', [StormController::class, 'saveScenario']);
            Route::put('api/scenarios/{id}', [StormController::class, 'saveScenario']);
            Route::get('api/runs', [StormController::class, 'runs']);
            Route::post('api/runs', [StormController::class, 'start']);
            Route::get('api/runs/{id}', [StormController::class, 'run']);
            Route::post('api/runs/{id}/stop', [StormController::class, 'stop']);
            Route::get('api/runs/{id}/metrics', [StormController::class, 'metrics']);
            Route::get('api/runs/{id}/samples', [StormController::class, 'samples']);
            Route::get('api/runs/{id}/report', [StormController::class, 'report']);
            Route::get('api/compare/{left}/{right}', [StormController::class, 'compare']);
        });
    });
});
