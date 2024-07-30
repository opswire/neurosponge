<?php
declare(strict_types=1);

namespace Database\Factories\Common\Roles;

use App\Models\Common\Roles\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

final class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        return [
            'display_name' => $this->faker->unique()->word(),
        ];
    }
}
