<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evento extends Model
{
    protected $fillable = [
        'titulo',
        'descricao',
        'data',
        'hora',
        'local',
        'tipo',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'date',
        ];
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function presencas()
    {
        return $this->hasMany(Presenca::class);
    }
}
