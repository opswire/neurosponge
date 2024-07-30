<?php
declare(strict_types=1);

namespace App\Action\Deck;

use App\DTO\Deck\Deck\InputGetDecksDTO;
use App\Models\Deck\Deck;
use Illuminate\Pagination\LengthAwarePaginator;

final class GetDecksAction
{
    public function execute(InputGetDecksDTO $dto): LengthAwarePaginator
    {
        return Deck::query()
            ->withCount([
                'cards',
            ])
            ->filter($dto->filter)
            ->sort($dto->sort)
            ->paginate();
    }
}
