<?php
declare(strict_types=1);

namespace App\Action\Deck;

use App\DTO\Deck\Deck\InputGetDecksDTO;
use App\Models\Deck\Deck;
use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use function Amp\Dns\query;

final class GetDecksAction
{
    public function execute(InputGetDecksDTO $dto): Collection|LengthAwarePaginator
    {
        /** @var Builder $query */
        $query = Deck::query()
            ->withCount(['cards'])
            ->filter($dto->filter)
            ->sort($dto->sort);

        return $dto->paginate
            ? $query->paginate(perPage: $dto->per_page, page: $dto->page)
            : $query
                ->get()
                ->toBase();
    }
}
