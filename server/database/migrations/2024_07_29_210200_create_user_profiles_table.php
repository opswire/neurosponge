<?php

use App\Models\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_profiles', function (Blueprint $table) {
            $table
                ->foreignId('user_id')
                ->primary()
                ->constrained(User::getTableName())
                ->restrictOnDelete()
                ->restrictOnUpdate();
            $table->string('name', 255)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
