<?php
declare(strict_types=1);

namespace App\Action\Deck;

use App\Models\Deck\Deck;
use Illuminate\Support\Collection;

final class GetDecksAction
{
    public function execute(): Collection
    {
        return Deck::all()->toBase();
    }
}
