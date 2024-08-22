<?php
declare(strict_types=1);

namespace App\Models\User;

use App\Models\AbstractModel;
use App\Models\Deck\Card\Card;
use App\Models\Deck\Deck;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $card_id
 * @property int $streak
 * @property int $repeats
 * @property string $status
 * @property CarbonInterface $last_time_repetition
 * @property CarbonInterface $next_time_repetition
 * @property CarbonInterface $created_at
 * @property CarbonInterface $updated_at
 *
 * @property-read Deck $deck
 */
final class UserCard extends AbstractModel
{
    use HasFactory;

    protected $table = 'user_cards';

    public $timestamps = false;

    protected $fillable = [
        'streak',
        'repeats',
        'status',
        'last_time_repetition',
        'next_time_repetition',
    ];

    protected $casts = [
        'last_time_repetition' => 'datetime',
        'next_time_repetition' => 'datetime',
    ];

    // [Relations]

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            related: User::class,
            foreignKey: 'user_id',
            ownerKey: 'id',
        );
    }

    public function card(): BelongsTo
    {
        return $this->belongsTo(
            related: Card::class,
            foreignKey: 'card_id',
            ownerKey: 'id',
        );
    }
}
