<?php

use App\Http\Controllers\Deck\GetDeckController;
use App\Http\Controllers\Deck\GetDecksController;
use App\Http\Controllers\Deck\GetDecksTitleController;
use App\Http\Controllers\Deck\Repetition\GetDeckRepetitionNewCardsController;
use App\Http\Controllers\Deck\Repetition\GetDeckRepetitionToRepeatCardsController;
use App\Http\Controllers\Deck\Repetition\GetDeckRepetitionSummaryController;
use App\Http\Controllers\Deck\Repetition\DeckRepeatCardController;
use App\Models\Common\Roles\Role;
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
        ->get('{deckId}/repetition/cards/to-repeat', GetDeckRepetitionToRepeatCardsController::class)
        ->name('repetition.cards.to-repeat.index');

    $router
        ->get('{deckId}/repetition/cards/new', GetDeckRepetitionNewCardsController::class)
        ->name('repetition.cards.new.index');

    $router
        ->get('{deckId}/repetition/summary', GetDeckRepetitionSummaryController::class)
        ->name('repetition.summary')
        ->middleware(['auth:api', 'role:' . Role::ADMIN]);

    $router
        ->post('{deckId}/repetition/cards/{cardId}/repeat', DeckRepeatCardController::class) // ебаная хуета
        ->name('repetition.cards.repeat');
});
