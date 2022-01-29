<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'estudiantes';
    protected $primaryKey = 'id_estudiante';
    protected $fillable = [
         'nombres', 'apellidos', 'cedula', 'id_carrera'
    ];
    
     public function carrera(){
          return $this->belongsTo('App\Models\Carrera','id_carrera');
     }
     public function grupo(){
          return $this->hasMany('App\Models\Grupo','id_estudiante');
      }
     
}

