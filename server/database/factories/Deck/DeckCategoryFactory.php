<?php

namespace Database\Factories\Deck;

use App\Models\Deck\Deck;
use App\Models\Deck\DeckCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

final class DeckCategoryFactory extends Factory
{
    protected $model = DeckCategory::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'color' => $this->faker->word(),
        ];
    }
}
