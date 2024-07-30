<?php
declare(strict_types=1);

namespace Database\Seeders\User;

use App\Models\User\User;
use App\Models\User\UserProfile;
use Illuminate\Database\Seeder;

final class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->has(
                factory: UserProfile::factory()->state(['name' => 'admin']),
                relationship: 'profile',
            )
            ->state([
                'email' => 'admin@admin.com',
                'password' => 'admin',
            ])
            ->create();
    }
}
