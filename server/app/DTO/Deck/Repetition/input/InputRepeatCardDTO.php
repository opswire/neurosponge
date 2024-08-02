<?php
declare(strict_types=1);

namespace App\DTO\Deck\Repetition\input;

use App\Enum\Deck\Repetition\RepetitionRatingEnum;
use App\Models\Deck\Card\Card;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

final class InputRepeatCardDTO extends Data
{
    public function __construct(
        public int $cardId,
        public int $grade
    ) {}

    public static function rules(ValidationContext $context): array
    {
        return [
            'cardId' => ['bail', 'required', 'integer', Rule::exists(Card::getTableName(), 'id')],
            'grade' => ['bail', 'required', 'string', Rule::enum(RepetitionRatingEnum::class)],
        ];
    }
}
