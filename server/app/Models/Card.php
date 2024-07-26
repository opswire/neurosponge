<?php
declare(strict_types=1);

namespace App\Models;

use Database\Factories\CardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

final class Card extends Model
{
    use HasFactory;

    protected $table = 'cards';

    protected $fillable = [
        'question',
        'answer',
        'image_url',
        'created_at',
        'updated_at',
    ];

    protected static function newFactory(): Factory
    {
        return CardFactory::new();
    }
}
