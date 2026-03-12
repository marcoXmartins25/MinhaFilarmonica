<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presencas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evento_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['presente', 'ausente', 'justificado'])->default('ausente');
            $table->timestamps();
            $table->unique(['evento_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presencas');
    }
};
