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
            $table
                ->foreignId('card_id')
                ->constrained(Card::getTableName())
                ->restrictOnDelete()
                ->restrictOnUpdate();
            $table
                ->foreignId('deck_id')
                ->constrained(Deck::getTableName())
                ->restrictOnDelete()
                ->restrictOnUpdate();

            $table->unique(['card_id', 'deck_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('card_deck');
    }
};
