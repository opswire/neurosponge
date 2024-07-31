<?php
declare(strict_types=1);

namespace App\Transformer\Deck;

use App\Models\Deck\Deck;
use Flugg\Responder\Transformers\Transformer;

final class DeckTitleTransformer extends Transformer
{
    public function transform(Deck $deck): array
    {
        return [
            'id' => $deck->id,
            'title' => $deck->title,
        ];
    }
}
