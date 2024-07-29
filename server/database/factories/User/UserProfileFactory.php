<?php

namespace Database\Factories\User;

use App\Models\Deck\Deck;
use App\Models\User\UserProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

final class UserProfileFactory extends Factory
{
    protected $model = UserProfile::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
        ];
    }
}
