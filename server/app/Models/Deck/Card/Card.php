<?php
declare(strict_types=1);

namespace App\Models\Deck\Card;

use App\Models\AbstractModel;
use App\Models\Deck\CardDeck;
use App\Models\Deck\Deck;
use App\Models\User\UserCard;
use Carbon\CarbonInterface;
use Database\Factories\Card\CardFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $deck_id
 * @property string $question
 * @property string $answer
 * @property string $image_url
 * @property CarbonInterface $created_at
 * @property CarbonInterface $updated_at
 */
final class Card extends AbstractModel
{
    use HasFactory;

    protected $table = 'cards';

    protected $fillable = [
        'question',
        'answer',
        'image_url',
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
            parentKey: 'id',
            relatedKey: 'id',
        );
    }

    public function userCards(): HasMany
    {
        return $this->hasMany(
            related: UserCard::class,
            foreignKey: 'card_id',
            localKey: 'id',
        );
    }
}
