<?php

/** @var Router $router */

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Routing\Router;

$router->group(['prefix' => 'auth', 'as' => 'deck.', 'middleware' => 'auth:api'],  static function (Router $router): void {
    $router
        ->post('/login', [AuthController::class, 'login'])
        ->name('login')
        ->withoutMiddleware('auth:api');
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
