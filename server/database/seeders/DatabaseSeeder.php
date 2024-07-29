<?php

namespace Database\Seeders;

use Database\Seeders\Deck\DeckSeeder;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);

//        Card::factory()
//            ->count(400)
//            ->create();
        $this->call([
           DeckSeeder::class,
        ]);

    }
}
