<?php
declare(strict_types=1);

namespace App\Models\Card;

use App\Models\AbstractModel;
use App\Models\Deck\Deck;
use Database\Factories\Card\CardFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 */
final class Card extends AbstractModel
{
    use HasFactory;

    protected $table = 'cards';

    protected $fillable = [
        'question',
        'answer',
        'image_url',
        'created_at',
        'updated_at',
    ];

    protected static function newFactory(): Factory
    {
        return CardFactory::new();
    }

    public function decks(): BelongsToMany
    {
        return $this->belongsToMany(
            related: Deck::class,
            table: 'card_deck',
            foreignPivotKey: 'card_id',
            relatedPivotKey: 'deck_id',
        );
    }
}
