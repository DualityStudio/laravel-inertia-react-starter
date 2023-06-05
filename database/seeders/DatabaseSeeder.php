<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Imports\AssessmentImport;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'test@local.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        $team = Team::create([
            'name' => 'Local',
            'user_id' => $user->id,
            'personal_team' => true,
        ]);

        $user->update([
            'current_team_id' => $team->id,
        ]);

        if (file_exists(storage_path('app/defence-check.xlsx'))) {
            (new AssessmentImport())->import(storage_path('app/defence-check.xlsx'));
        }
    }
}
