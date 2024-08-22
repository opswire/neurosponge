<?php

use App\Action\Deck\Repetition\DeckRepeatCardAction;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('test', function () {
   $ans = App::make(DeckRepeatCardAction::class)->execute(1, 'easy');
   dd($ans);
});
