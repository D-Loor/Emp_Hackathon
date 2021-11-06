<?php

namespace App\Http\Controllers;
use DB;
use PDF;
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

            return response()->json(['result'=>"Registro Exitoso", 'code'=>'201']);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function show(Grupo $grupo)
    {
        //
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
    public function update(Request $request, Grupo $grupo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Grupo  $grupo
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
       

    }
    public function GenerarPDF($fecha){

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

        $datos=DB::table('grupos')
        ->join('estudiantes', function ($join) {
            $join->on('grupos.id_estudiante', '=', 'estudiantes.id_estudiante')
                 ->join('carreras','estudiantes.id_carrera', '=','carreras.id_carrera');
        })
        ->get();
        
        return \PDF::loadView('ReporteGrupos', compact('datos','dia','mes','anio'))->setPaper('a4', 'scape')->stream('Reporte Hackathon '.$fecha.'.pdf');

    }
    public function eliminar()
    {
        $datos=Grupo::all();
        $num_rows = count($datos);

        if($num_rows!=0){
            DB::table('grupos')->truncate();
            
            return response()->json(['result'=>"Datos Eliminado", 'code'=>'201']);

        }else
        return response()->json(['result'=>"Registros no encontrados", 'code'=>'202']);

    }        
       
       
}
