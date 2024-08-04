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
//        'weights' => [
//            0 => 0.4872,
//            1 => 1.4003,
//            2 => 3.7145,
//            3 => 13.8206,
//            4 => 5.1618,
//            5 => 1.2298,
//            6 => 0.8975,
//            7 => 0.031,
//            8 => 1.6474,
//            9 => 0.1367,
//            10 => 1.0461,
//            11 => 1.1072,
//            12 => 0.1893,
//            13 => 0.3246,
//            14 => 1.587,
//            15 => 0.2272,
//            16 => 2.8755,
//        ],
        'weights' => [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616, 0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.1407, 6, 0.5034, 0.6567],
        'decay' => $decay,
        'factor' => 0.8,
        'requestRetention' => 0.9,
        'maximumInterval' => 36500,
    ],
];
