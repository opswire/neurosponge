<?php
declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EchoController
{
    #[Route('/echo', name: 'echo')]
    public function echo(): JsonResponse
    {
        return new JsonResponse([
            'data' => 'success',
            'status' => 200,
        ]);
    }
}