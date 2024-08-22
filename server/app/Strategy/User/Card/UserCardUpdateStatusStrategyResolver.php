<?php
declare(strict_types=1);

namespace App\Strategy\User\Card;

use App\Models\User\UserCard;
use Illuminate\Support\Facades\App;

final readonly class UserCardUpdateStatusStrategyResolver
{
    public static function execute(bool $isPositive, UserCard $userCard): UserCard
    {
        $strategy = $isPositive
            ? App::make(UserCardPositiveUpdateStatusStrategy::class)
            : App::make(UserCardNegativeUpdateStatusStrategy::class);

        assert($strategy instanceof UserCardPositiveUpdateStatusStrategy);

        return $strategy->execute($userCard);
    }
}
