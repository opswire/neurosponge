<?php
declare(strict_types=1);

namespace App\Transformer\Common\Roles;

use Flugg\Responder\Transformers\Transformer;
use Spatie\Permission\Models\Role;

final class RoleTransformer extends Transformer
{
    public function transform(Role $role): array // todo: to our model
    {
        return [
            'name' => $role->name,
            'display_name' => $role->display_name,
        ];
    }
}
