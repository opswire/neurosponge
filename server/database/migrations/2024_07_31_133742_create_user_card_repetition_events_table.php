<?php

use App\Enum\Deck\Repetition\RepetitionRatingEnum;
use App\Enum\Deck\Repetition\RepetitionStatusEnum;
use App\Models\Deck\Card\Card;
use App\Models\User\UserCard;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_card_repetition_events', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('user_card_id')
                ->constrained(UserCard::getTableName())
                ->cascadeOnDelete()
                ->cascadeOnDelete();
            $table->enum('status', RepetitionStatusEnum::values());
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_card_repetition_events');
    }
};
