<?php
declare(strict_types=1);

namespace App\DTO\Deck\Repetition\input;

use App\Enum\Deck\Repetition\RepetitionRatingEnum;
use App\Enum\Deck\Repetition\RepetitionStatusEnum;
use App\Models\Deck\Card\Card;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

final class InputGetDeckRepetitionCardsDTO extends Data
{
    public function __construct(
        #[FromRouteParameter('deckId')]
        public int $deckId,
        public string $status,
    ) {}

    public static function rules(ValidationContext $context): array
    {
        return [
            'deckId' => ['bail', 'required', 'integer', Rule::exists(Card::getTableName(), 'id')],
            'status' => ['bail', 'required', 'string', Rule::enum(RepetitionStatusEnum::class)],
        ];
    }
}
