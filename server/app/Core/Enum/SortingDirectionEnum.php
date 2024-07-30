<?php
declare(strict_types=1);

namespace App\Core\Enum;

use ArchTech\Enums\Values;

enum SortingDirectionEnum: string
{
    use Values;

    case ASC = 'asc';
    case DESC = 'desc';
}
