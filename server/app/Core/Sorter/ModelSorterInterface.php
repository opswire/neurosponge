<?php
declare(strict_types=1);

namespace App\Core\Sorter;

use Illuminate\Database\Eloquent\Builder;

interface ModelSorterInterface
{
    public function updateQuery(Builder $query, string $direction): Builder;

    public static function allowedOptions(): array;

}
