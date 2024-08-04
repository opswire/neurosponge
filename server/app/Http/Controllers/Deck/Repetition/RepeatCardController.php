<?php
declare(strict_types=1);

namespace App\Http\Controllers\Deck\Repetition;

use App\Action\Deck\Repetition\RepeatCardAction;
use App\DTO\Deck\Repetition\input\InputRepeatCardDTO;

final class RepeatCardController
{
    public function __construct(private readonly RepeatCardAction $action) {}

    public function __invoke(InputRepeatCardDTO $dto)
    {

        $this->action->execute($dto);
        // TODO: Implement __invoke() method.
    }
}
