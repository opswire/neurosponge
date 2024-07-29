<?php
declare(strict_types=1);

namespace App\Transformer\User;

use App\Models\Deck\Deck;
use App\Models\User\User;
use App\Models\User\UserProfile;
use Flugg\Responder\Transformers\Transformer;

final class UserProfileTransformer extends Transformer
{
    public function transform(UserProfile $profile): array
    {
        return [
            'name' => $profile->name,
        ];
    }
}
