<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Transformer\User\UserTransformer;
use Flugg\Responder\Responder;
use Illuminate\Auth\AuthManager;
use Illuminate\Config\Repository as ConfigRepository;
use Illuminate\Http\JsonResponse;

final class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(
        private readonly Responder $responder,
        private readonly AuthManager $authManager,
        private readonly ConfigRepository $config,
    ) {}

    /**
     * Get a JWT via given credentials.
     *
     * @return JsonResponse
     */
    public function login(): JsonResponse
    {
        $credentials = request(['email', 'password']);

        $token = $this->authManager->attempt($credentials);
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        assert(is_string($token));

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     */
    public function me(): JsonResponse
    {
        return $this->responder
            ->success($this->authManager->user(), new UserTransformer())
            ->respond();
    }

    /**
     * Log the user out (Invalidate the token).
     */
    public function logout(): JsonResponse
    {
        $this->authManager->logout();

        return $this->responder
            ->success(['message' => 'Successfully logged out'])
            ->respond();
    }

    /**
     * Refresh a token.
     */
    public function refresh(): JsonResponse
    {
        $token = $this->authManager->refresh();

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken(string $token): JsonResponse
    {
        return $this->responder
            ->success(
                [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => $this->config->get('jwt.ttl'),
                ]
            )
            ->respond();
    }
}
