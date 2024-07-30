<?php
declare(strict_types=1);

namespace App\Models\Deck;

use App\Core\Sorter\Sortable;
use App\ModelFilter\Deck\DeckFilter;
use App\Models\AbstractModel;
use App\Models\Card\Card;
use App\Models\User\User;
use Database\Factories\Deck\DeckFactory;
use DateTime;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Query\Builder;

/**
 * @property int $id
 * @property int $author_id
 * @property int $category_id
 * @property string $uuid
 * @property string $title
 * @property DateTime $created_at
 * @property DateTime $updated_at
 *
 * @property-read User $author
 * @property-read DeckCategory $category
 *
 * @method static Builder filter(array $filters)
 */
final class Deck extends AbstractModel
{
    use HasFactory;
    use Filterable;
    use Sortable;

    protected $table = 'decks';

    protected $fillable = [
        'uuid',
        'title',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function provideFilter(): string
    {
        return DeckFilter::class;
    }

    protected static function newFactory(): Factory
    {
        return DeckFactory::new();
    }

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
}
