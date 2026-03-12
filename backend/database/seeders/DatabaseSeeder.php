<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'nome' => 'Administrador',
            'email' => 'admin@filarmonica.pt',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        User::create([
            'nome' => 'Maestro Silva',
            'email' => 'maestro@filarmonica.pt',
            'password' => bcrypt('maestro123'),
            'role' => 'maestro',
        ]);

        User::create([
            'nome' => 'João Músico',
            'email' => 'joao@filarmonica.pt',
            'password' => bcrypt('musico123'),
            'role' => 'musico',
        ]);

        User::create([
            'nome' => 'Maria Música',
            'email' => 'maria@filarmonica.pt',
            'password' => bcrypt('musico123'),
            'role' => 'musico',
        ]);
    }
}
