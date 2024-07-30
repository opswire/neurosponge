<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck;

use App\Action\Deck\GetDecksAction;
use App\Transformer\Deck\DeckTransformer;
use Flugg\Responder\Responder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\JsonResponse;

final readonly class GetDecksController
{
    public function __construct(
        private Responder $responder,
        private GetDecksAction $action,
    ) {}

    public function __invoke(): JsonResponse
    {
        $decks = $this->action->execute();

        return $this->responder
            ->success($decks, new DeckTransformer())
            ->with([
                'category:id,title,color',
            ])
            ->respond();
    }
}
