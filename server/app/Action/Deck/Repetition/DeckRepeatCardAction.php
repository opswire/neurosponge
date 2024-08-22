<?php
declare(strict_types=1);

namespace App\Action\Deck\Repetition;

use App\DTO\Deck\Repetition\input\InputRepeatCardDTO;
use App\Enum\Deck\Repetition\RepetitionStatusEnum;
use App\Models\User\User;
use App\Models\User\UserCard;
use App\Strategy\User\Card\UserCardUpdateStatusStrategyResolver;
use Illuminate\Auth\AuthManager;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Support\DateFactory;

final readonly class DeckRepeatCardAction
{
    public function __construct(
        private AuthManager $authManager,
        private DateFactory $dateFactory,
        private ConfigRepository $config,
    ) {}

    public function execute(InputRepeatCardDTO $dto): UserCard
    {
        /** @var User $user */
        $user = $this->authManager->user();

        /** @var null|UserCard $userCard */
        $userCard = $user
            ->userCards()
            ->where(UserCard::getTableName() . '.card_id', '=', $dto->cardId)
            ->first();

        if (! $userCard) {
            $userCard = new UserCard();
            $userCard->user_id = $user->id;
            $userCard->card_id = $dto->cardId;
            $userCard->status = $dto->is_positive ? RepetitionStatusEnum::ALREADY_KNOWN->value : RepetitionStatusEnum::REPEATED->value;
            $userCard->repeats = 1;
            $userCard->streak = (int)$dto->is_positive;
            $userCard->last_time_repetition = $this
                ->dateFactory
                ->now();
            $userCard->next_time_repetition = $this
                ->dateFactory
                ->now()
                ->addSeconds($this->config->get('Deck.repetition.intervals')[0]);

            $userCard->save();

            // save event
            return $userCard;
        }

        $userCard = UserCardUpdateStatusStrategyResolver::execute($dto->is_positive, $userCard);

        return $userCard;
    }
}
