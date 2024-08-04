<?php

use App\Http\Controllers\Deck\GetDeckController;
use App\Http\Controllers\Deck\GetDecksController;
use App\Http\Controllers\Deck\GetDecksTitleController;
use App\Http\Controllers\Deck\Repetition\GetDeckRepetitionCardsController;
use App\Http\Controllers\Deck\Repetition\RepeatCardController;
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
        ->name('show');

    $router
        ->get('{deckId}/repetition-cards', GetDeckRepetitionCardsController::class)
        ->name('repetition-cards.index');

    $router
        ->post('{deckId}/repetition-cards/{cardId}/repeat', RepeatCardController::class)
        ->name('repetition-cards.repeat');
});
