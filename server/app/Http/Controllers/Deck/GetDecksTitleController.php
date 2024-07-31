<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck;

use App\Action\Deck\GetDecksAction;
use App\DTO\Deck\Deck\input\InputGetDecksDTO;
use App\Transformer\Deck\DeckTitleTransformer;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;

final readonly class GetDecksTitleController
{
    public function __construct(
        private Responder $responder,
        private GetDecksAction $action,
    ) {}

    public function __invoke(InputGetDecksDTO $dto): JsonResponse
    {
        $decks = $this->action->execute($dto);

        return $this->responder
            ->success($decks, new DeckTitleTransformer())
            ->respond();
    }
}
