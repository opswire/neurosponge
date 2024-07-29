<?php
declare(strict_types=1);

namespace App\Transformer\Card;

use App\Models\Card\Card;
use Flugg\Responder\Transformers\Transformer;

final class CardTransformer extends Transformer
{
    public function transform(Card $card): array
    {
        return [
            'id' => $card->id,
            'question' => $card->question,
            'answer' => $card->answer,
        ];
    }
}
