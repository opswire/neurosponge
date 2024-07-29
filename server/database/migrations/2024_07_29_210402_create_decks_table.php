<?php

use App\Models\Deck\DeckCategory;
use App\Models\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('decks', function (Blueprint $table) {
            $table->id();
            $table->uuid()->index();
            $table
                ->foreignId('author_id')
                ->constrained(User::getTableName())
                ->restrictOnDelete()
                ->restrictOnUpdate();
            $table
                ->foreignId('category_id')
                ->constrained(DeckCategory::getTableName())
                ->restrictOnDelete()
                ->restrictOnUpdate();
            $table->string('title', 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('decks');
    }
};
