<?php

/** @var Router $router */

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\Registration\RegisterUserController;
use Illuminate\Routing\Router;

$router->group(['prefix' => 'auth', 'as' => 'deck.'],  static function (Router $router): void {
    $router
        ->post('/register', RegisterUserController::class)
        ->name('register');
    $router
        ->post('/login', [AuthController::class, 'login'])
        ->name('login');

    $router->group(['middleware' => 'auth:api'],  static function (Router $router): void {
        $router
            ->get('/me', [AuthController::class, 'me'])
            ->name('me');
        $router
            ->post('/logout', [AuthController::class, 'logout'])
            ->name('logout');
        $router
            ->post('/refresh', [AuthController::class, 'refresh'])
            ->name('refresh');
    });
});
