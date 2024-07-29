<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck\Card;

use App\Action\Deck\Card\GetDeckCardsAction;
use App\Transformer\Deck\DeckTransformer;
use Flugg\Responder\Responder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\JsonResponse;

final readonly class GetDeckCards
{
    public function __construct(
        private Responder $responder,
        private GetDeckCardsAction $action,
    ) {}

    public function __invoke(int $deckId): JsonResponse
    {
        $deck = $this->action->execute($deckId);

        return $this->responder
            ->success($deck, new DeckTransformer())
            ->with([
                'author' => static fn (BelongsTo $builder): BelongsTo => $builder
                    ->select(['id', 'name', 'email'])
                    ->with(['profile:user_id,name']),
                'category:id,title,color',
                'cards:id,question,answer',
            ])
            ->respond();
    }
}
