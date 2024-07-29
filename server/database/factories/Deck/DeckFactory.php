<?php

namespace Database\Factories\Deck;

use App\Models\Deck\Deck;
use Illuminate\Database\Eloquent\Factories\Factory;

final class DeckFactory extends Factory
{
    protected $model = Deck::class;

    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid(),
            'title' => $this->faker->word(),
        ];
    }
}
