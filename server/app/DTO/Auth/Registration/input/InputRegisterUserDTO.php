<?php
declare(strict_types=1);

namespace App\DTO\Auth\Registration\input;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

final class InputRegisterUserDTO extends Data
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
    ) {}

    public static function rules(ValidationContext $context): array
    {
        return [
            'email' => ['bail', 'required', 'email', 'max:255'],
            'password' => ['bail', 'required', 'string', 'min:6', 'max:255'],
        ];
    }
}
