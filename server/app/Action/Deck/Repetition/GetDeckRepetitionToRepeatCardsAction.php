<?php
declare(strict_types=1);

namespace App\Action\Deck\Repetition;

use App\Enum\Deck\Repetition\RepetitionStatusEnum;
use App\Models\Deck\Deck;
use App\Models\User\User;
use App\Models\User\UserCard;
use Illuminate\Auth\AuthManager;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\DateFactory;

final readonly class GetDeckRepetitionToRepeatCardsAction
{
    public function __construct(
        private DateFactory $dateFactory,
        private AuthManager $authManager,
        private ConfigRepository $config,
    ) {}

    public function execute(int $deckId): Collection
    {
        /** @var User $user */
        $user = $this->authManager->user();

        return $user
            ->userCards()
            ->where(UserCard::getTableName() . '.next_time_repetition', '<=', $this->dateFactory->now())
            ->where(UserCard::getTableName() . '.status', '=', RepetitionStatusEnum::REPEATED->value)
            ->whereHas('card.decks', fn (Builder $builder): Builder => $builder
                ->where(Deck::getTableName() . '.id', '=', $deckId))
            ->orderBy(UserCard::getTableName() . '.next_time_repetition', 'asc')
            ->limit($this->config->get('Deck.repetition.limit'))
            ->get()
            ->pluck('card')
            ->toBase();
    }
}
