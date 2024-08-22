<?php
declare(strict_types=1);

namespace Database\Seeders\Deck;

use App\Models\Deck\Card\Card;
use App\Models\Deck\Deck;
use App\Models\Deck\DeckCategory;
use App\Models\User\User;
use App\Models\User\UserProfile;
use Illuminate\Database\Seeder;

final class DeckSeeder extends Seeder
{
    public function run(): void
    {
        Deck::factory()
            ->count(8)
            ->for(
                factory: User::factory()
                    ->has(
                        factory: UserProfile::factory()->state(['name' => 'Petushok']),
                        relationship: 'profile',
                    ),
                relationship: 'author',
            )
            ->for(
                factory: DeckCategory::factory()->state(['title' => 'Angular']),
                relationship: 'category',
            )
            ->create()
            ->each(function(Deck $deck) {
                $deck->cards()->attach(Card::factory()->count(50)->create());
            });
    }
}
