<?php
declare(strict_types=1);

namespace App\Action\Deck\Repetition;

use App\Models\Deck\Deck;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Support\Collection;

final readonly class GetDeckRepetitionNewCardsAction
{
    public function __construct(
        private ConfigRepository $config,
    ) {}

    public function execute(int $deckId): Collection
    {
        /** @var Deck $deck */
        $deck = Deck::query()->findOrFail($deckId);

        return $deck
            ->cards()
            ->whereDoesntHave('userCards')
            ->limit($this->config->get('Deck.repetition.limit'))
            ->get()
            ->toBase();
    }
}
