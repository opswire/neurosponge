<?php

namespace Database\Seeders;

use Database\Seeders\Deck\DeckSeeder;
use Database\Seeders\Production\Common\RoleSeeder;
use Database\Seeders\User\UserSeeder;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(
            [
                RoleSeeder::class,
                UserSeeder::class,
                DeckSeeder::class,
            ]
        );
    }
}
