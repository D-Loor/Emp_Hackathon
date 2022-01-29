<?php

namespace App\Http\Controllers;
use DB;
use PDF;
use App\Models\Evento;
use App\Models\Grupo;
use Illuminate\Http\Request;


class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$result=Grupo::with('estudiante','recarrera')->get();

        $result=DB::table('grupos')
        ->join('estudiantes', function ($join) {
            $join->on('grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
                 ->join('carreras','estudiantes.id_carrera', '=','carreras.id_carrera');
        })
        ->get();

        $num_rows = count($result);

        if($num_rows!=0){
            return response()->json(['result'=>$result , 'code'=>'201']);
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
     
            $datos=new Grupo();
            $datos->grupo=$request->nombre;
            $datos->id_estudiante=$request->id_estudiante;
            $datos->save();

            return response()->json(['result'=>"Registro Exitoso",'code'=>'201']);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result=DB::table('grupos')->where('id_evento',$id)
        ->join('estudiantes', function ($join) {
            $join->on('grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
                 ->join('carreras','estudiantes.id_carrera', '=','carreras.id_carrera');
        })->orderBy('grupo', 'ASC')->get();

        $num_rows = count($result);

        if($num_rows!=0){
            return response()->json(['result'=>$result , 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function edit(Grupo $grupo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $datos=Grupo::find($request->id_grupo);
        if($datos != null){
            $datos->grupo=$request->grupo;
            $datos->update();
            return response()->json(['result'=>"Dato Actualizado", 'code'=>'201']);
        }else
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_eli)
    {
        $datos=Grupo::find($id_eli);
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);

    }
    public function GenerarPDF($id,$fecha){

        $valores = explode('-', $fecha);
        $dia = $valores[2];
        $mes = $valores[1];
        $anio = $valores[0];

        switch ($mes) {
            case 1:
                $mes="Enero";
                break;
            case 2:
                $mes="Febrero";
                break;
            case 3:
                $mes="Marzo";
                break;
            case 4:
                $mes="Abril";
                break;
            case 5:
                $mes="Mayo";
                break;
            case 6:
                $mes="Junio";
                break;
            case 7:
                $mes="Julio";
                break;
            case 8:
                $mes="Agosto";
                break;
            case 9:
                $mes="Septiembre";
                break;
            case 10:
                $mes="Octubre";
                break;
            case 11:
                $mes="Noviembre";
                break;
            case 12:
                $mes="Diciembre";
                break;
        }

        $evento=Evento::find($id);
        $datos=DB::table('grupos')->where('id_evento',$id)
        ->join('estudiantes', function ($join) {
            $join->on('grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
                 ->join('carreras','estudiantes.id_carrera', '=','carreras.id_carrera');
        })->orderBy('grupo', 'ASC')->get();
        
        return \PDF::loadView('ReporteGrupos', compact('datos','dia','mes','anio','evento'))->setPaper('a4', 'scape')->stream('Reporte Hackathon '.$fecha.'.pdf');

    }
    
    public function eliminar($id)
    {
        $result=DB::table('grupos')->where('id_evento',$id)
        ->join('estudiantes', function ($join) {
            $join->on('grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
                 ->join('carreras','estudiantes.id_carrera', '=','carreras.id_carrera');
        })
        ->get()->first();

        if($result!=null){
            DB::table('grupos')->join('estudiantes','grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
            ->where('estudiantes.id_evento',$id)->delete();  

            return response()->json(['result'=>"Datos Eliminado", 'code'=>'201']);

        }else
        return response()->json(['result'=>"Registros no encontrados", 'code'=>'202']);

    }        
    
    public function conformados($id)
    {
        $datos=Grupo::join('estudiantes','grupos.id_estudiante', '=', 'estudiantes.id_estudiante')->where('id_evento',$id)->get()->first();
        if($datos != null){
            return response()->json(['result'=>true, 'code'=>'201']);
        }else
            return response()->json(['result'=>false, 'code'=>'202']);
   
    }
       
}
