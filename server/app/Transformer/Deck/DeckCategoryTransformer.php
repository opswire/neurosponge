<?php
declare(strict_types=1);

namespace App\Transformer\Deck;

use App\Models\Deck\Deck;
use App\Models\Deck\DeckCategory;
use App\Transformer\User\UserTransformer;
use Flugg\Responder\Transformers\Transformer;

final class DeckCategoryTransformer extends Transformer
{
    public function transform(DeckCategory $category): array
    {
        return [
            'id' => $category->id,
            'title' => $category->title,
            'color' => $category->color,
        ];
    }
}
