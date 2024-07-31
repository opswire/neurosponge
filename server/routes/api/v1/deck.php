<?php

use App\Http\Controllers\Deck\GetDeckController;
use App\Http\Controllers\Deck\GetDecksController;
use App\Http\Controllers\Deck\GetDecksTitleController;
use Illuminate\Routing\Router;

/** @var Router $router */

$router->group(['prefix' => 'deck', 'as' => 'deck.'],  static function (Router $router): void {
    $router
        ->get('/', GetDecksController::class)
        ->name('index');
    $router
        ->get('/title', GetDecksTitleController::class)
        ->name('title');
    $router
        ->get('{deckId}', GetDeckController::class)
        ->name('show')
        ->middleware('auth:api');
});
