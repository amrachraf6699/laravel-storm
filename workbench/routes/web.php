<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/storm'));
Route::get('/api/products', fn () => response()->json(['products' => [['id' => 1, 'name' => 'Example fixture']]]));
Route::get('/api/slow', function () {
    usleep(100000);

    return response()->json(['ok' => true]);
});
Route::get('/api/fail', fn () => response()->json(['error' => 'Controlled fixture failure'], 500));
