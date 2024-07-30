<?php
declare(strict_types=1);

namespace App\ModelFilter\Deck;

use App\Models\Deck\Deck;
use EloquentFilter\ModelFilter;

final class DeckFilter extends ModelFilter
{
    public function search(string $search): self
    {
        return $this->where(
            column: Deck::getTableName() . '.title',
            operator: 'ilike',
            value: "%{$search}%"
        );
    }

    public function author(int $id): self
    {
        return $this->where(
            column: Deck::getTableName() . '.author_id',
            operator: '=',
            value: $id
        );
    }

    public function category(int $id): self
    {
        return $this->where(
            column: Deck::getTableName() . '.category_id',
            operator: '=',
            value: $id
        );
    }
}
