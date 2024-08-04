<?php
declare(strict_types=1);

namespace App\Action\Deck\Repetition;

use App\Models\Deck\Card\Card;
use App\Models\Deck\Deck;
use Illuminate\Support\DateFactory;

final readonly class GetDeckRepetitionCardsAction
{
    public function __construct(private DateFactory $dateFactory) {}

    public function execute(int $deckId)
    {
        /** @var Deck $deck */
        $deck = Deck::query()->findOrFail($deckId);

        $cards = Card::query()
            ->where(Card::getTableName() . '.deck_id', '=', $deck->id)
            ->where(Card::getTableName() . '.due', '<=', $this->dateFactory->now())
            ->get();
        dd($cards);
    }
}
