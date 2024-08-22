<?php
declare(strict_types=1);

namespace App\Strategy\User\Card;

use App\Enum\Deck\Repetition\RepetitionStatusEnum;
use App\Models\User\UserCard;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Support\DateFactory;

final readonly class UserCardPositiveUpdateStatusStrategy implements UserCardUpdateStatusStrategyInterface
{
    public function __construct(
        private DateFactory      $dateFactory,
        private ConfigRepository $config,
    ) {}

    public function execute(UserCard $userCard): UserCard
    {
        $userCard->last_time_repetition = $this->dateFactory->now();
        $userCard->repeats++;
        $userCard->streak++;

        $intervals = $this->config->get('Deck.repetition.intervals');

        if ($userCard->streak < count($intervals)) {
            $userCard->status = RepetitionStatusEnum::REPEATED->value;
            $userCard->next_time_repetition = $this
                ->dateFactory
                ->now()
                ->addSeconds($intervals[$userCard->streak]);
        } else {
            $userCard->status = RepetitionStatusEnum::MEMORIZED->value;
            $userCard->next_time_repetition = $this
                ->dateFactory
                ->now()
                ->addSeconds($this->config->get('Deck.repetition.memorized_interval'));
        }

        $userCard->save();

        return $userCard;
    }
}
