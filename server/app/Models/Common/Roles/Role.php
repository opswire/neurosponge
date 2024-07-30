<?php
declare(strict_types=1);

namespace App\Models\Common\Roles;

use Database\Factories\Common\Roles\RoleFactory;
use EloquentFilter\Filterable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Role as SpatieRole;

/**
 * @property int $id
 * @property string $name
 * @property string $guard_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property-read Collection $permissions
 * @property-read Collection $users
 */
class Role extends SpatieRole
{
    use Filterable;
    use HasFactory;

    public const ADMIN = 'admin';

    public const STUDENT = 'student';

    public static array $roles = [
        self::ADMIN,
        self::STUDENT,
    ];

    protected static function newFactory(): Factory
    {
        return RoleFactory::new();
    }
}

