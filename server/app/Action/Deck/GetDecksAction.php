<?php
declare(strict_types=1);

namespace App\Action\Deck;

use App\DTO\Deck\Deck\InputGetDecksDTO;
use App\Models\Deck\Deck;
use Illuminate\Support\Collection;

final class GetDecksAction
{
    public function execute(InputGetDecksDTO $dto): Collection
    {
        return Deck::query()
            ->filter($dto->filter)
            ->get()
            ->toBase();
    }
}
