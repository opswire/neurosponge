<?php
declare(strict_types=1);

use App\Enum\Deck\Repetition\RepetitionRatingEnum;

$decay = -0.5;

return [
    'algorithm' => [
        'grades' => [
            RepetitionRatingEnum::AGAIN->value => 1,
            RepetitionRatingEnum::HARD->value => 2,
            RepetitionRatingEnum::GOOD->value => 3,
            RepetitionRatingEnum::EASY->value => 4,
        ],
        'weights' => [
            0.4872,
            1.4003,
            3.7145,
            13.8206,
            5.1618,
            1.2298,
            0.8975,
            0.031,
            1.6474,
            0.1367,
            1.0461,
            2.1072,
            0.0793,
            0.3246,
            1.587,
            0.2272,
            2.8755,
        ],
        'decay' => $decay,
        'factor' => 19/81,
        'requestRetention' => 0.9,
        'maximumInterval' => 36500,
    ],
];
