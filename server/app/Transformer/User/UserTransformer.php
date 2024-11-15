<?php
declare(strict_types=1);

namespace App\Transformer\User;

use App\Models\Deck\Deck;
use App\Models\User\User;
use App\Transformer\Common\Roles\RoleTransformer;
use Flugg\Responder\Transformers\Transformer;

final class UserTransformer extends Transformer
{
    protected $relations = [
        'profile' => UserProfileTransformer::class,
        'roles' => RoleTransformer::class,
    ];

    public function transform(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
