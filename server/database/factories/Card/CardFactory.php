<?php

namespace Database\Factories\Card;

use App\Models\Deck\Card\Card;
use Illuminate\Database\Eloquent\Factories\Factory;

final class CardFactory extends Factory
{
    protected $model = Card::class;

    public function definition(): array
    {
        return [
            'question' => $this->faker->word(),
            'answer' => $this->faker->word(),
        ];
    }
}
