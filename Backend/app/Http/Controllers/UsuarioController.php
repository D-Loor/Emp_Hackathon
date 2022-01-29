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
    public function ingresar(Request $request)
    {
     
        $valida=User::where('correo', $request->correo)->get()->first();
        
        if( $valida!= null){
            return response()->json(['result'=>"Usuario ya se encuentra registrado", 'code'=>'400']);
        }else{
            $datos=new User();
            $datos->correo=$request->correo;
            $datos->nombres=$request->nombres;
            $datos->password=$request->password;
            $datos->rol=$request->rol;
            $datos->save();

            return response()->json(['result'=>"Registro Exitoso",'code'=>'201']);
        }
        
    }
    public function eliminar($id_eli)
    {
        $datos=User::find($id_eli);
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);

    }

    public function mostrar()
    {
        $datos=User::orderBy('nombres', 'ASC')->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos , 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);
    
    }

    public function actualizar(Request $request)
    {
        $valida=User::where('correo', $request->correo)->where('id_usuario','!=',$request->id_usuario)->get();
        $count=count($valida);
        if( $count ==0){

            $datos=user::find($request->id_usuario);
            if($datos != null){
                
                $datos->correo=$request->correo;
                $datos->nombres=$request->nombres;
                $datos->password=$request->password;
                $datos->update();
                return response()->json(['result'=>"Registro Exitoso", 'code'=>'201']);
            
            
            }else
                return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }else
            return response()->json(['result'=>"Registro duplicado", 'code'=>'400']);
    }


}
