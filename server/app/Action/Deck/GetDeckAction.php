<?php
declare(strict_types=1);

namespace App\Action\Deck;

use App\Models\Deck\Deck;

final class GetDeckAction
{
    public function execute(int $deckId): Deck
    {
        return Deck::query()->findOrFail($deckId);
    }
}
