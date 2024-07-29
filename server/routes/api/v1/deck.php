<?php

use App\Http\Controllers\Deck\Card\GetDeckCards;
use Illuminate\Routing\Router;

/** @var Router $router */

$router->group(['prefix' => 'deck', 'as' => 'deck.'],  static function (Router $router): void {
    $router
        ->get('{deckId}/cards', GetDeckCards::class)
        ->name('deck.cards.index');
});
