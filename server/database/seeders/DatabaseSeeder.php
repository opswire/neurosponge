<?php

namespace Database\Seeders;

use Database\Seeders\Deck\DeckSeeder;
use Database\Seeders\User\UserSeeder;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(
            [
                UserSeeder::class,
                DeckSeeder::class,
            ]
        );
    }
}
