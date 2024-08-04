<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck\Repetition;

use App\Action\Deck\Repetition\GetDeckRepetitionCardsAction;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;

final readonly class GetDeckRepetitionCardsController
{
    public function __construct(
        private GetDeckRepetitionCardsAction $action,
        private Responder $responder,
    ) {}

    public function __invoke(int $deckId): JsonResponse
    {
        $this->action->execute($deckId);

        return $this->responder->success()->respond();
    }
}
