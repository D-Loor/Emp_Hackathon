<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Grupo extends Model
{
    use HasFactory;
    use \Znck\Eloquent\Traits\BelongsToThrough;
    public $timestamps=false;
    protected $table = 'grupos';
    protected $primaryKey = 'id_grupo';
    protected $fillable = [
         'id_estudiante','grupo'
    ];
     public function estudiante(){
        return $this->belongsTo('App\Models\Estudiante','id_estudiante');
     }
     public function recarrera(){          
          //return $this->belongsToThrough(Carrera::class, Estudiante::class,Grupo::class);
          return $this->hasManyThrough('App\Models\Carrera', 'App\Models\Estudiante','id_estudiante','id_carrera','id_grupo','id_carrera');
     }
     
}
