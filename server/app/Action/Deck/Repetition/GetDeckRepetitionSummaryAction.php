<?php

namespace App\Action\Deck\Repetition;

use Illuminate\Support\DateFactory;
use Random\RandomException;

final readonly class GetDeckRepetitionSummaryAction
{
    public function __construct(private DateFactory $dateFactory)
    {
    }

    /**
     * @throws RandomException
     */
    public function execute(): array
    {
        return [
            'new' => 12,
            'to_repeat' => 3,
            'already_known' => 7,
            'next_time_to_repeat' => $this->dateFactory->now()->addHour()->toIso8601String(),
            'is_petushok' => (bool)random_int(0, 1)
        ];
    }
}
