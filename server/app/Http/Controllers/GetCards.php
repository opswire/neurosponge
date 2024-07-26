<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Card;

final class GetCards
{
    public function __invoke()
    {
        $cards = Card::query()->get()->toBase()->toArray();

        return ['success' => $cards];
    }
}
