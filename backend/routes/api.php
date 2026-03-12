<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\PresencaController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::middleware('auth:api')->group(function () {
    Route::apiResource('users', UserController::class)->except(['index']);
    Route::get('users/all', [UserController::class, 'index']);

    Route::apiResource('eventos', EventoController::class);

    Route::get('presencas', [PresencaController::class, 'index']);
    Route::post('presencas', [PresencaController::class, 'store']);
    Route::get('eventos/{eventoId}/presencas', [PresencaController::class, 'porEvento']);
    Route::post('eventos/{eventoId}/presenca', [PresencaController::class, 'marcar']);
    Route::put('presencas/{id}', [PresencaController::class, 'update']);
    Route::delete('presencas/{id}', [PresencaController::class, 'destroy']);
});
