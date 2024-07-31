<?php
declare(strict_types=1);

namespace App\Action\Auth\Registration;

use App\DTO\Auth\Registration\input\InputRegisterUserDTO;
use App\Models\Common\Roles\Role;
use App\Models\User\User;
use Illuminate\Database\DatabaseManager;
use Illuminate\Hashing\HashManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Throwable;

final readonly class RegisterUserAction
{
    public function __construct(
        private DatabaseManager $databaseManager,
        private HashManager $hashManager,
        private LoggerInterface $logger,
    ) {}

    /**
     * @throws ConflictHttpException
     */
    public function execute(InputRegisterUserDTO $dto): User
    {
        if (User::query()->where(User::getTableName() . '.email', '=', $dto->email)->exists()) {
            throw new ConflictHttpException(message: 'User with this email already exists.', code: 409);
        }

        try {
            return $this
                ->databaseManager
                ->transaction(
                    function () use ($dto) {
                        $user = User::query()->create(
                            [
                                'name' => 'default', // Todo: default
                                'email' => $dto->email,
                                'password' => $this->hashManager->make($dto->password),
                            ]
                        );

                        $user->profile()->create([
                            'name' => 'default',
                        ]);

                        $user->assignRole(Role::STUDENT);

                        return $user;
                    }
                );
        } catch (Throwable $e) {
            $this
                ->logger
                ->error(
                    message: 'Failed to create user via email.',
                    context: [
                        'error' => $e->getMessage(),
                        'email' => $dto->email,
                    ],
                );
            throw new BadRequestHttpException($e->getMessage()); // Todo: message
        }
    }
}
