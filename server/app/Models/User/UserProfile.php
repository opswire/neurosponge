<?php
declare(strict_types=1);

namespace App\Models\User;

use App\Models\AbstractModel;
use Database\Factories\User\UserProfileFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class UserProfile extends AbstractModel
{
    use HasFactory;

    protected $table = 'user_profiles';

    protected $fillable = [
        'name',
    ];

    public $timestamps = false;

    protected $primaryKey = null;

    public $incrementing = false;

    protected static function newFactory(): Factory
    {
        return UserProfileFactory::new();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            related: User::class,
            foreignKey: 'user_id',
            ownerKey: 'id',
        );
    }
}
