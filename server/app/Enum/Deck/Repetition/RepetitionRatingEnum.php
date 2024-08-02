<?php
declare(strict_types=1);

namespace App\Enum\Deck\Repetition;

use ArchTech\Enums\Values;

enum RepetitionRatingEnum: string
{
    use Values;

    case AGAIN = 'again';
    case HARD = 'hard';
    case GOOD = 'good';
    case EASY = 'easy';
}
