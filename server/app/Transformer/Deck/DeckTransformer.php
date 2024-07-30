<?php
declare(strict_types=1);

namespace App\Transformer\Deck;

use App\Models\Deck\Deck;
use App\Transformer\Card\CardTransformer;
use App\Transformer\User\UserTransformer;
use Flugg\Responder\Transformers\Transformer;

final class DeckTransformer extends Transformer
{
    protected $relations = [
        'author' => UserTransformer::class,
        'category' => DeckCategoryTransformer::class,
        'cards' => CardTransformer::class,
    ];

    public function transform(Deck $deck): array
    {
        return [
            'id' => $deck->id,
            'uuid' => $deck->uuid,
            'title' => $deck->title,
            'cards_count' => $deck->cards_count
        ];
    }
}
