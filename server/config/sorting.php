<?php
declare(strict_types=1);

use App\Models\Deck\Deck;
use App\ModelSort\SimpleSorter;

return [
    Deck::class => [
        'id' => SimpleSorter::class,
        'created_at' => SimpleSorter::class,
    ],
];
