<?php

namespace App\Strategy\User\Card;

use App\Models\User\UserCard;

interface UserCardUpdateStatusStrategyInterface
{
    public function execute(UserCard $userCard): UserCard;
}
