<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'eventos';
    protected $primaryKey = 'id_evento';
    protected $fillable = [
         'evento', 'estado'
    ];
    public function evento(){
        return $this->hasMany('App\Models\evento','id_evento');
    }
}