<?php
declare(strict_types=1);

namespace App\Action\Deck\Repetition;

use App\Models\Deck\Card\Card;
use Carbon\CarbonInterface;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Support\DateFactory;

final readonly class RepeatCardAction
{
    private array $weights;
    private array $grades;
    private float $factor;
    private float $decay;
    private CarbonInterface $now;

    public function __construct(
        private ConfigRepository $config,
        private DateFactory $dateFactory,
    ) {
        $this->weights = $this->config->get('Deck.repetition.algorithm.weights');
        $this->grades = $this->config->get('Deck.repetition.algorithm.grades');
        $this->decay = $this->config->get('Deck.repetition.algorithm.decay');
        $this->factor = $this->config->get('Deck.repetition.algorithm.factor');
        $this->now = $this->dateFactory->now()->toImmutable();
    }

    public function execute(int $id, string $rating): Card
    {
        /** @var Card $card */
        $card = Card::query()->findOrFail($id);

        $this->changeCardByRating($card, $rating);
        $schedulingCardsLog = $this->repeat($card);
        $card->scheduling_cards_log = $schedulingCardsLog;
        $card->save();

        return $card;
    }

    private function changeCardByRating(Card $card, string $rating): void
    {
        $card->state = $card->scheduling_cards_log[$rating]['state'];
        $card->stability = $card->scheduling_cards_log[$rating]['stability'];
        $card->difficulty = $card->scheduling_cards_log[$rating]['difficulty'];
        $card->due = $this->now
            ->addDays($card->scheduling_cards_log[$rating]['interval_in_days'])
            ->addMinutes($card->scheduling_cards_log[$rating]['interval_in_minutes'])->timestamp;
        $card->last_review_time = $this->now->timestamp;
    }

    private function repeat(Card $card): array
    {
        $schedulingCardsLog = $this->updateState($card);

        switch ($card->state) {
            case Card::LEARNING:
            case Card::RELEARNING:
                $hardInterval = 0;
                $goodInterval = Card::nextInterval($schedulingCardsLog[Card::GOOD]['stability']);
                $easyInterval = max(
                    Card::nextInterval($schedulingCardsLog[Card::EASY]['stability']), $goodInterval + 1
                );
                $this->schedule($schedulingCardsLog, $hardInterval, $goodInterval, $easyInterval);
                break;
            case Card::REVIEW:
                $elapsedDays = ($card->due->timestamp - $card->last_review_time->timestamp) / (60 * 60 * 24); // due
                $retrievability = $this->forgettingCurve($elapsedDays, $card->stability);
                $schedulingCardsLog = $this->nextSchedulingStabilityAndDifficulty(
                    $schedulingCardsLog, $card->difficulty, $card->stability, $retrievability
                );
                $hardInterval = Card::nextInterval($schedulingCardsLog[Card::HARD]['stability']);
                $goodInterval = Card::nextInterval($schedulingCardsLog[Card::GOOD]['stability']);
                $hardInterval = min($hardInterval, $goodInterval);
                $goodInterval = max($goodInterval, $hardInterval + 1);
                $easyInterval = max(
                    Card::nextInterval($schedulingCardsLog[Card::EASY]['stability']), $goodInterval + 1
                );
                $schedulingCardsLog = $this->schedule(
                    $schedulingCardsLog,
                    $hardInterval,
                    $goodInterval,
                    $easyInterval,
                );
                break;
        }

        $card->last_review_time = $this->now;
        $card->repeats += 1;

        return $this->recordLog($schedulingCardsLog);
    }

    public function updateState(Card $card): array
    {
        $schedulingCardsLog = $card->scheduling_cards_log;

        switch ($card->state) {
            case Card::NEW:
                $schedulingCardsLog[Card::AGAIN]['state'] = Card::LEARNING;
                $schedulingCardsLog[Card::HARD]['state'] = Card::LEARNING;
                $schedulingCardsLog[Card::GOOD]['state'] = Card::LEARNING;
                $schedulingCardsLog[Card::EASY]['state'] = Card::REVIEW;
                break;
            case Card::LEARNING:
            case Card::RELEARNING:
                $schedulingCardsLog[Card::AGAIN]['state'] = $card->state;
                $schedulingCardsLog[Card::HARD]['state'] = $card->state;
                $schedulingCardsLog[Card::GOOD]['state'] = Card::REVIEW;
                $schedulingCardsLog[Card::EASY]['state'] = Card::REVIEW;
                break;
            case Card::REVIEW:
                $schedulingCardsLog[Card::AGAIN]['state'] = Card::RELEARNING;
                $schedulingCardsLog[Card::HARD]['state'] = Card::REVIEW;
                $schedulingCardsLog[Card::GOOD]['state'] = Card::REVIEW;
                $schedulingCardsLog[Card::EASY]['state'] = Card::REVIEW;
                $schedulingCardsLog[Card::AGAIN]['lapses'] += 1;
                break;
        }

        return $schedulingCardsLog;
    }

    public function schedule(
        array $schedulingCardsLog,
        float $hardInterval,
        float $goodInterval,
        float $easyInterval
    ): array {
        $schedulingCardsLog[Card::AGAIN]['interval_in_days'] = 0;
        $schedulingCardsLog[Card::HARD]['interval_in_days'] = round($hardInterval);
        $schedulingCardsLog[Card::GOOD]['interval_in_days'] = round($goodInterval);
        $schedulingCardsLog[Card::EASY]['interval_in_days'] = round($easyInterval);
        $schedulingCardsLog[Card::AGAIN]['interval_in_minutes'] = 5;
        $schedulingCardsLog[Card::HARD]['interval_in_minutes'] = 0;
        $schedulingCardsLog[Card::GOOD]['interval_in_minutes'] = 0;
        $schedulingCardsLog[Card::EASY]['interval_in_minutes'] = 0;

        return $schedulingCardsLog;
    }

    public function recordLog(array $schedulingCardsLog): array
    {
        $log = [];
        foreach (Card::RATINGS as $rating) {
            $log[$rating] = $schedulingCardsLog[$rating];
        }
        return $log;
    }

    public function forgettingCurve(float $elapsedDays, float $stability): float|object|int
    {
        return pow(1 + $this->factor * $elapsedDays / $stability, $this->decay);
    }

    public function nextSchedulingStabilityAndDifficulty(
        array $schedulingCardsLog,
        float $lastD,
        float $lastS,
        float $retrievability,
    ): array {
        $schedulingCardsLog[Card::AGAIN]['difficulty'] = $this->nextDifficulty($lastD, Card::AGAIN);
        $schedulingCardsLog[Card::AGAIN]['stability'] = $this->nextForgetStability($lastD, $lastS, $retrievability);

        $schedulingCardsLog[Card::HARD]['difficulty'] = $this->nextDifficulty($lastD, Card::HARD);
        $schedulingCardsLog[Card::HARD]['stability'] = $this->nextRecallStability(
            $lastD, $lastS, $retrievability, Card::HARD
        );

        $schedulingCardsLog[Card::GOOD]['difficulty'] = $this->nextDifficulty($lastD, Card::GOOD);
        $schedulingCardsLog[Card::GOOD]['stability'] = $this->nextRecallStability(
            $lastD, $lastS, $retrievability, Card::GOOD
        );

        $schedulingCardsLog[Card::EASY]['difficulty'] = $this->nextDifficulty($lastD, Card::EASY);
        $schedulingCardsLog[Card::EASY]['stability'] = $this->nextRecallStability(
            $lastD, $lastS, $retrievability, Card::EASY
        );

        return $schedulingCardsLog;
    }

    public function constrainDifficulty(float $difficulty)
    {
        return min(max($difficulty, 1), 10);
    }

    public function nextDifficulty(float $difficulty, string $rating): float
    {
        $nextDifficulty = $difficulty - $this->weights[6] * ($this->grades[$rating] - 3);

        return $this->constrainDifficulty($this->meanReversion($this->weights[4], $nextDifficulty));
    }

    public function meanReversion(float $init, float $current): float
    {
        return $this->weights[7] * $init + (1 - $this->weights[7]) * $current;
    }

    public function nextRecallStability(float $difficulty, float $stability, float $r, string $rating): float
    {
        $hardPenalty = $rating === Card::HARD ? $this->weights[15] : 1;
        $easyBonus = $rating === Card::EASY ? $this->weights[16] : 1;

        return $stability * (1 + exp($this->weights[8]) * (11 - $difficulty) * pow($stability, -$this->weights[9])
                * (exp((1 - $r) * $this->weights[10]) - 1)
                * $hardPenalty * $easyBonus);
    }

    public function nextForgetStability(float $difficulty, float $stability, float $r): float
    {
        return $this->weights[11] * pow($difficulty, -$this->weights[12]) * (pow(
                    $stability + 1, $this->weights[13]
                ) - 1) * exp(
                (1 - $r) * $this->weights[14]
            );
    }
}
