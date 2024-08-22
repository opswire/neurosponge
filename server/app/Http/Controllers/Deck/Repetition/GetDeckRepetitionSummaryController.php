<?php

namespace App\Http\Controllers\Deck\Repetition;

use App\Action\Deck\Repetition\GetDeckRepetitionSummaryAction;
use Flugg\Responder\Responder;
use Illuminate\Http\JsonResponse;
use Random\RandomException;

final readonly class GetDeckRepetitionSummaryController
{
    public function __construct(
        private GetDeckRepetitionSummaryAction $action,
        private Responder                      $responder,
    ){}

    /**
     * @throws RandomException
     */
    public function __invoke(): JsonResponse
    {
        $data = $this->action->execute();

        return $this->responder
            ->success($data)
            ->respond();
    }
}
