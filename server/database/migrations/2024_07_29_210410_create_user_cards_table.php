<?php

use App\Enum\Deck\Repetition\RepetitionStatusEnum;
use App\Models\Deck\Card\Card;
use App\Models\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_cards', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('user_id')
                ->constrained(User::getTableName())
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table
                ->foreignId('card_id')
                ->constrained(Card::getTableName())
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->enum('status', RepetitionStatusEnum::values())->default(RepetitionStatusEnum::NEW->value);
            $table->integer('streak')->default(0);
            $table->integer('repeats')->default(0);
            $table->dateTime('last_time_repetition')->nullable();
            $table->dateTime('next_time_repetition');

            $table->unique(['user_id', 'card_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_cards');
    }
};
