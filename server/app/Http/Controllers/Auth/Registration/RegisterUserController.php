<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth\Registration;

use App\Action\Auth\Registration\RegisterUserAction;
use App\DTO\Auth\Registration\input\InputRegisterUserDTO;
use App\Transformer\User\UserTransformer;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

final readonly class RegisterUserController
{
    public function __construct(
        private Responder $responder,
        private RegisterUserAction $action,
    ) {}

    public function __invoke(InputRegisterUserDTO $dto): JsonResponse
    {
        try {
            $user = $this->action->execute($dto);
        } catch (ConflictHttpException $e) {
            return $this
                ->responder
                ->error($e->getCode(), $e->getMessage())
                ->respond($e->getCode());
        }

        return $this
            ->responder
            ->success($user, new UserTransformer())
            ->with([
                'profile:id,name',
                'roles:id,name,display_name'
            ])
            ->respond();
    }
}
