<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck\Repetition;

use App\Action\Deck\Repetition\GetDeckRepetitionToRepeatCardsAction;
use App\Transformer\Card\CardTransformer;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;

final readonly class GetDeckRepetitionToRepeatCardsController
{
    public function __construct(
        private GetDeckRepetitionToRepeatCardsAction $action,
        private Responder                            $responder,
    ) {}

    public function __invoke(int $deckId): JsonResponse
    {
        $cards = $this->action->execute($deckId);

        return $this->responder
            ->success($cards->first(), new CardTransformer())
            ->meta([
                'meta' => [
                    'total_count' => $cards->count(),
                ],
            ])
            ->respond();
    }
}
