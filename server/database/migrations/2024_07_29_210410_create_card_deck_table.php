<?php

use App\Models\Deck\Card\Card;
use App\Models\Deck\Deck;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('card_deck', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('card_id')
                ->constrained(Card::getTableName())
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table
                ->foreignId('deck_id')
                ->constrained(Deck::getTableName())
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->double('stability_repetition')->default(0.0);
            $table->double('difficult_repetition')->default(0.0);
            $table->dateTime('last_time_repetition')->nullable();

            $table->unique(['card_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('card_deck');
    }
};
