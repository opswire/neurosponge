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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('deck_id')
                ->constrained(Deck::getTableName())
                ->restrictOnDelete()
                ->restrictOnUpdate();
            $table->string('question');
            $table->string('answer');
            $table->string('image_url')->nullable();
            $table->string('state')->default('new'); // Todo: enum
            $table->double('stability')->default(0.0);
            $table->double('difficulty')->default(0.0);
            $table->integer('repeats')->default(0);
            $table->timestamp('due')->useCurrent();
            $table->timestamp('last_review_time')->nullable();
            $table->jsonb('scheduling_cards_log')->default(json_encode(Card::initSchedulingCardsLog()));
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
