<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('team_invitations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('team_id')->cascadeOnDelete();
            $table->string('email');
            $table->string('role')->nullable();
            $table->timestamps();

            $table->unique(['team_id', 'email']);
        });
    }
};
