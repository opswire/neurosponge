<?php
declare(strict_types=1);

namespace App\Models\Deck;

use App\Models\AbstractModel;
use Database\Factories\Deck\DeckCategoryFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

final class DeckCategory extends AbstractModel
{
    use HasFactory;

    protected $table = 'deck_categories';

    protected static function newFactory(): Factory
    {
        return DeckCategoryFactory::new();
    }
}
