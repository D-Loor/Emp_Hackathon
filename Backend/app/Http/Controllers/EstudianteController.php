<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Grupo;
use Illuminate\Http\Request;
use DB;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Estudiante::with('carrera')->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos , 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $valida=Estudiante::where('cedula', $request->cedula)->where('id_evento', $request->id_evento)->get()->first();
        if( $valida!= null){
            return response()->json(['result'=>"Estudiante ya se encuentra registrado", 'code'=>'400']);
        }else{

            $datos=new Estudiante();
            $datos->nombres=$request->nombres;
            $datos->apellidos=$request->apellidos;
            $datos->cedula=$request->cedula;
            $datos->id_carrera=$request->id_carrera;
            $datos->id_evento=$request->id_evento;
            $datos->save();
            $data = Estudiante::latest('id_estudiante')->first();
            return response()->json(['result'=>"Registro Exitoso",'id'=> $data,'code'=>'201']);
        
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function show($id_evento)
    {
        
            $datos=Estudiante::with('carrera')->where('id_evento',$id_evento)->get();
            $num_rows = count($datos);

            if($num_rows!=0){
                return response()->json(['result'=>$datos , 'code'=>'201']);
            }else
                return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);

    
    }
    public function validar($id_evento)
    {
        $conformados=DB::table('grupos')
        ->join('estudiantes','grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
        ->where('estudiantes.id_evento',$id_evento)->get();

        if(count($conformados)==0){
            $datos=Estudiante::with('carrera')->where('id_evento',$id_evento)->get();
            $num_rows = count($datos);

            if($num_rows!=0){
                return response()->json(['result'=>$datos , 'code'=>'201']);
            }else
                return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);

        }else
            return response()->json(['mensaje'=>"Grupos ya conformados", 'code'=>'400']);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function edit(Estudiante $estudiante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Estudiante $estudiante)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_estudiante)
    {
        $datos=Estudiante::find($id_estudiante);
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);

    }
}
