<?php

use App\Http\Controllers\Deck\GetDeckController;
use App\Http\Controllers\Deck\GetDecksController;
use Illuminate\Routing\Router;

/** @var Router $router */

$router->group(['prefix' => 'deck', 'as' => 'deck.'],  static function (Router $router): void {
    $router
        ->get('/', GetDecksController::class)
        ->name('index');
    $router
        ->get('{deckId}', GetDeckController::class)
        ->name('show')
        ->middleware('auth:api');
});
