<?php
declare(strict_types=1);

namespace App\ModelSort;

use App\Core\Sorter\AbstractSorter;
use Illuminate\Database\Eloquent\Builder;

final class SimpleSorter extends AbstractSorter
{
    public function __construct(private readonly string $columnName) {}

    public function updateQuery(Builder $query, string $direction): Builder
    {
        return $query->orderBy(column: $this->columnName, direction: $direction);
    }
}
