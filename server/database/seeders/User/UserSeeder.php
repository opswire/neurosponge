<?php
declare(strict_types=1);

namespace Database\Seeders\User;

use App\Models\Common\Roles\Role;
use App\Models\User\User;
use App\Models\User\UserProfile;
use Illuminate\Database\Seeder;

final class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = Role::all();

        foreach ($roles as $role) {
            $email = sprintf('%s@%s.com', $role->name, $role->name);

            if (User::query()->where(User::getTableName() . '.email', '=', $email)->exists()) {
                continue;
            }

            /** @var User $user */
            $user = User::factory()
                ->has(
                    factory: UserProfile::factory()->state(['name' => $role->name]),
                    relationship: 'profile',
                )
                ->state([
                    'email' => $email,
                    'password' => $role->name,
                ])
                ->create();

            $user->roles()->attach($role);
        }
    }
}
