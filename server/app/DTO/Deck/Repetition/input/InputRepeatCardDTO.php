<?php
declare(strict_types=1);

namespace App\DTO\Deck\Repetition\input;

use App\Models\Deck\Card\Card;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\FromRouteParameter;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

final class InputRepeatCardDTO extends Data
{
    public function __construct(
        #[FromRouteParameter('cardId')]
        public int $cardId,
        public bool $is_positive,
    ) {}

    public static function rules(ValidationContext $context): array
    {
        return [
            'cardId' => ['bail', 'required', 'integer', Rule::exists(Card::getTableName(), 'id')],
            'is_positive' => ['bail', 'required', 'boolean'],
        ];
    }
}
