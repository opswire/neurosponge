<?php
declare(strict_types=1);

namespace App\Action\Deck\Card;

use App\Models\Deck\Deck;

final class GetDeckCardsAction
{
    public function execute(int $deckId): Deck
    {
        return Deck::query()->findOrFail($deckId);
    }
}
