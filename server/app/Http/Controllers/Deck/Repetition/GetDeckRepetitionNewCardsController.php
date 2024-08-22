<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck\Repetition;

use App\Action\Deck\Repetition\GetDeckRepetitionNewCardsAction;
use App\Transformer\Card\CardTransformer;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;

final readonly class GetDeckRepetitionNewCardsController
{
    public function __construct(
        private GetDeckRepetitionNewCardsAction $action,
        private Responder                       $responder,
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
