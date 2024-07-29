<?php
declare(strict_types=1);

namespace App\Models\Deck;

use App\Models\AbstractModel;
use App\Models\Card\Card;
use App\Models\User\User;
use Database\Factories\Deck\DeckFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class Deck extends AbstractModel
{
    use HasFactory;

    protected $table = 'decks';

    public function cards(): BelongsToMany
    {
        return $this->belongsToMany(
            related: Card::class,
            table: 'card_deck',
            foreignPivotKey: 'deck_id',
            relatedPivotKey: 'card_id',
        );
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(
            related: User::class,
            foreignKey: 'author_id',
            ownerKey: 'id',
        );
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(
            related: DeckCategory::class,
            foreignKey: 'category_id',
            ownerKey: 'id',
        );
    }

    protected static function newFactory(): Factory
    {
        return DeckFactory::new();
    }
}
