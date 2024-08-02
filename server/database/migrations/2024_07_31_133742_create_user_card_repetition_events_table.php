<?php

use App\Enum\Deck\Repetition\RepetitionRatingEnum;
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
                ->foreignId('card_deck_id')
                ->constrained('card_deck')
                ->cascadeOnDelete()
                ->cascadeOnDelete();
            $table->enum('grade', RepetitionRatingEnum::values());
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_card_repetition_events');
    }
};
