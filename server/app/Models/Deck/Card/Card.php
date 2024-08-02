<?php
declare(strict_types=1);

namespace App\Models\Deck\Card;

use App\Enum\Deck\Repetition\RepetitionRatingEnum;
use App\Enum\Deck\Repetition\RepetitionStateEnum;
use App\Models\AbstractModel;
use App\Models\Deck\CardDeck;
use App\Models\Deck\Deck;
use Carbon\CarbonInterface;
use Database\Factories\Card\CardFactory;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\App;
use stdClass;

/**
 * @property int $id
 * @property int $deck_id
 * @property string $question
 * @property string $answer
 * @property string $image_url
 * @property string $state
 * @property float $stability
 * @property float $difficulty
 * @property int $repeats
 * @property int $elapsedDays
 * @property int $scheduledDays
 * @property stdClass $scheduling_cards_log
 * @property CarbonInterface $due
 * @property CarbonInterface $last_review_time
 * @property CarbonInterface $created_at
 * @property CarbonInterface $updated_at
 *
 * @property-read Deck $deck
 */
final class Card extends AbstractModel
{
    public const AGAIN = RepetitionRatingEnum::AGAIN->value;
    public const HARD = RepetitionRatingEnum::HARD->value;
    public const GOOD = RepetitionRatingEnum::GOOD->value;
    public const EASY = RepetitionRatingEnum::EASY->value;
    public const RATINGS = [
        self::AGAIN,
        self::HARD,
        self::GOOD,
        self::EASY,
    ];

    public const NEW = RepetitionStateEnum::NEW->value;
    public const LEARNING = RepetitionStateEnum::LEARNING->value;
    public const RELEARNING = RepetitionStateEnum::RELEARNING->value;
    public const REVIEW = RepetitionStateEnum::REVIEW->value;
    public const STATES = [
        self::NEW,
        self::LEARNING,
        self::RELEARNING,
        self::REVIEW,
    ];

    use HasFactory;

    protected $table = 'cards';

    protected $fillable = [
        'question',
        'answer',
        'image_url',
        'state',
        'stability',
        'difficulty',
        'repeats',
        'elapsedDays',
        'scheduledDays',
        'scheduling_cards_log',
    ];

    protected $casts = [
        'difficulty' => 'double',
        'stability' => 'double',
        'due' => 'datetime',
        'last_review_time' => 'datetime',
        'scheduling_cards_log' => 'array',
    ];

    protected static function newFactory(): Factory
    {
        return CardFactory::new();
    }

    public static function initSchedulingCardsLog(): array // Todo: need caching
    {
        $config = App::make(ConfigRepository::class);
        $weights = $config->get('Deck.repetition.algorithm.weights');
        $grades = $config->get('Deck.repetition.algorithm.grades');

        return [
            self::AGAIN => [
                'state' => self::LEARNING,
                'stability' => self::initStability(Card::AGAIN, $weights, $grades),
                'difficulty' => self::initDifficulty(Card::AGAIN, $weights, $grades),
                'interval_in_minutes' => 1,
                'interval_in_days' => 0,
                'lapses' => 0,
            ],
            self::HARD => [
                'state' => self::LEARNING,
                'stability' => self::initStability(Card::HARD, $weights, $grades),
                'difficulty' => self::initDifficulty(Card::HARD, $weights, $grades),
                'interval_in_minutes' => 5,
                'interval_in_days' => 0,
                'lapses' => 0,
            ],
            self::GOOD => [
                'state' => self::LEARNING,
                'stability' => self::initStability(Card::GOOD, $weights, $grades),
                'difficulty' => self::initDifficulty(Card::GOOD, $weights, $grades),
                'interval_in_minutes' => 10,
                'interval_in_days' => 0,
                'lapses' => 0,
            ],
            self::EASY => [
                'state' => self::REVIEW,
                'stability' => self::initStability(Card::EASY, $weights, $grades),
                'difficulty' => self::initDifficulty(Card::EASY, $weights, $grades),
                'interval_in_minutes' => 0,
                'interval_in_days' => (int)self::nextInterval(self::initStability(Card::EASY, $weights, $grades)),
                'lapses' => 0,
            ],
        ];
    }

    public static function initStability(string $rating, array $weights, array $grades)
    {
        return max($weights[$grades[$rating] - 1], 0.1);
    }

    public static function initDifficulty(string $rating, array $weights, array $grades)
    {
        return self::constrainDifficulty(
            $weights[4] - $weights[5] * ($grades[$rating] - 3)
        );
    }

    public static function constrainDifficulty(float $difficulty)
    {
        return min(max($difficulty, 1), 10);
    }

    public static function nextInterval(float $stability)
    {
        $config = App::make(ConfigRepository::class);

        $factor = $config->get('Deck.repetition.algorithm.factor');
        $requestRetention = $config->get('Deck.repetition.algorithm.requestRetention');
        $decay = $config->get('Deck.repetition.algorithm.decay');
        $maximumInterval = $config->get('Deck.repetition.algorithm.maximumInterval');

        $newInterval = $stability / $factor * (pow($requestRetention, 1 / $decay) - 1);

        return max(min(round($newInterval), $maximumInterval), 1);
    }

    public function deck(): BelongsTo
    {
        return $this->belongsTo(
            related: Deck::class,
            foreignKey: 'card_id',
            ownerKey: 'id',
        );
    }
}
