<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function Autentificar($correo,$pass)
    {
        $datos=User::where('correo',$correo)->where('password',$pass)->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos , 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);
    
    }
}
