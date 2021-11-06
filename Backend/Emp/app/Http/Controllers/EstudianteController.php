<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;

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
        
        $valida=Estudiante::where('cedula', $request->cedula)->get()->first();
        if( $valida!= null){
            return response()->json(['result'=>"Estudiante ya se encuentra registrado", 'code'=>'400']);
        }else{

            $datos=new Estudiante();
            $datos->nombres=$request->nombres;
            $datos->apellidos=$request->apellidos;
            $datos->cedula=$request->cedula;
            $datos->id_carrera=$request->id_carrera;
            $datos->save();

            return response()->json(['result'=>"Registro Exitoso", 'code'=>'201']);
        
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function show(Estudiante $estudiante)
    {
        //
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
        $datos=Estudiantes::find($id_estudiante);
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);

    }
}
