<?php
declare(strict_types=1);

namespace App\Enum\Deck\Repetition;

use ArchTech\Enums\Values;

enum RepetitionStatusEnum: string
{
    use Values;

    case NEW = 'new';
    case REPEATED = 'repeated';
    case MEMORIZED = 'memorized';
    case ALREADY_KNOWN = 'already_known';
}
