<?php

use App\Http\Controllers\GetCards;
use Illuminate\Routing\Router;

/** @var Router $router */

$router->group(['prefix' => 'quiz', 'as' => 'quiz.'],  static function (Router $router): void {
    $router
        ->get('cards', GetCards::class)
        ->name('cards.index');
});
