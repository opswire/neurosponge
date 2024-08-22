<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck\Repetition;

use App\Action\Deck\Repetition\DeckRepeatCardAction;
use App\DTO\Deck\Repetition\input\InputRepeatCardDTO;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;

final readonly class DeckRepeatCardController
{
    public function __construct(
        private DeckRepeatCardAction $action,
        private Responder            $responder,
    ) {}

    public function __invoke(InputRepeatCardDTO $dto): JsonResponse
    {
        $data = $this->action->execute($dto);

        return $this->responder->success($data)->respond();
    }
}
