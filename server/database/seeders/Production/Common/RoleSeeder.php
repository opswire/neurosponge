<?php
declare(strict_types=1);

namespace Database\Seeders\Production\Common;

use App\Models\Common\Roles\Role;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

final class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = App::make(ConfigRepository::class)->get('seeder.roles');

        foreach ($roles as $role) {
            Role::query()->updateOrCreate($role, $role);
        }
    }
}
