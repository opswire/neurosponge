<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck;

use App\Action\Deck\GetDecksAction;
use App\DTO\Deck\Deck\input\InputGetDecksDTO;
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

    public function __invoke(InputGetDecksDTO $dto): JsonResponse
    {
        $decks = $this->action->execute($dto);

        return $this->responder
            ->success($decks, new DeckTransformer())
            ->with(
                [
                    'author' => static fn (BelongsTo $builder): BelongsTo => $builder
                        ->select(['id', 'email'])
                        ->with(['profile:user_id,name']),
                    'category:id,title,color',
                ]
            )
            ->respond();
    }
}
