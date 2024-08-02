<?php
declare(strict_types=1);

namespace App\Enum\Deck\Repetition;

use ArchTech\Enums\Values;

enum RepetitionStateEnum: string
{
    use Values;

    case NEW = 'new';
    case LEARNING = 'learning';
    case RELEARNING = 'relearning';
    case REVIEW = 'review';
}
