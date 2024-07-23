<?php
declare(strict_types=1);

namespace App\Controller;

use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Attributes as OA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EchoController
{
    /**
     * Узнать статус приложения
     */
    #[OA\Response(
        response: 200,
        description: 'Возвращает статус ответа',
        content: new OA\JsonContent(
            properties: [
                new OA\Property(
                    property: "data",
                    type: "string",
                    example: "success"
                ),
                new OA\Property(
                    property: "status",
                    type: "integer",
                    example: "200"
                )
            ],
            type: 'object',
        )
    )]
    #[OA\Tag(name: 'Test')]
    #[Route('/api/echo', name: 'echo', methods: ['GET'])]
    public function echo(): JsonResponse
    {
        return new JsonResponse([
            'data' => 'success',
            'status' => 200,
        ]);
    }
}