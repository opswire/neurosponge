<?php
declare(strict_types=1);

namespace App\Core\Sorter;

use App\Core\Enum\SortingDirectionEnum;

abstract class AbstractSorter implements ModelSorterInterface
{
    public static function allowedOptions(): array
    {
        return SortingDirectionEnum::values();
    }
}
