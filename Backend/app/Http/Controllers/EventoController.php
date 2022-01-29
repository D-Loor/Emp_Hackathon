<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Evento;
use Illuminate\Http\Request;
use DB;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Evento::orderBy('fecha_inicio', 'ASC')->get();
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
        $valida=Evento::where('evento', $request->evento)->get();
        $count=count($valida);
        if( $count !=0){
            return response()->json(['result'=>"Evento ya se encuentra registrado", 'code'=>'400']);
        }else{

            if($file=$request->file('imagen') == null){
                $picture = 'computacion.png';
            }else{
                $file=$request->file('imagen');
                $nombre=$file->getClientMimeType();
                $tipoImagen=str_replace('image/', '.',$nombre);
                $fileName=uniqid() . $tipoImagen;
                $path=public_path().'/imagenes';
                $file->move($path,$fileName);
                $picture = $fileName;
            };
            
            $datos=new Evento();
            $datos->evento=$request->evento;
            $datos->estado=$request->estado;
            $datos->fecha_inicio=$request->fecha_inicio;
            $datos->fecha_fin=$request->fecha_fin;
            $datos->imagen=$picture;
            $datos->save();

            return response()->json(['result'=>"Registro Exitoso", 'code'=>'201']);
        
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function show(Evento $evento)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function edit(Evento $evento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $valida=Evento::where('evento', $request->evento)->where('id_evento','!=',$request->id_evento)->get();
        $count=count($valida);
        if( $count ==0){

            if($datos != null){
                if($request->file('imagen') == null){
                    $picture = $datos -> imagen;
                }else{
                    if($datos -> imagen != 'undefined.png' && $datos -> imagen != 'administrador.png'&& $datos -> imagen != 'computacion.png'){
                        $archivo=substr($datos->imagen,1);
                        File::delete($archivo);
                    }
                    $file=$request->file('imagen');
                    $nombre=$file->getClientMimeType();
                    $tipoImagen=str_replace('image/', '.',$nombre);
                    $fileName=uniqid() . $tipoImagen;
                    $path=public_path().'/imagenes';
                    $file->move($path,$fileName);
                    $picture = $fileName;
                }; 
    
                $datos=Evento::find($request->id_evento);
                
                $datos->evento=$request->evento;
                $datos->estado=$request->estado;            
                $datos->fecha_inicio=$request->fecha_inicio;
                $datos->fecha_fin=$request->fecha_fin;
                $datos->imagen=$picture;
                $datos->update();
                return response()->json(['result'=>"Registro Exitoso", 'code'=>'201']);
            
            
            }else
                return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }else
            return response()->json(['result'=>"Registro duplicado", 'code'=>'400']);
    }

    public function actualizar(Request $request){
        $valida=Evento::where('evento', $request->evento)->where('id_evento','!=',$request->id_evento)->get();
        $count=count($valida);
        if( $count ==0){
            $datos=Evento::find($request->id_evento);
            if($datos != null){
                if($request->file('imagen') == null){
                    $picture = 'computacion.png';
                }else{
                   /*  if($datos -> imagen != 'undefined.png' && $datos -> imagen != 'administrador.png'&& $datos -> imagen != 'computacion.png' && $datos -> imagen != 'espam.png'){
                        $archivo=substr($datos->imagen,1);
                        File::delete($archivo);
                    } */
                    $file=$request->file('imagen');
                    $nombre=$file->getClientMimeType();
                    $tipoImagen=str_replace('image/', '.',$nombre);
                    $fileName=uniqid() . $tipoImagen;
                    $path=public_path().'/imagenes';
                    $file->move($path,$fileName);
                    $picture = $fileName;
                }; 
    
                
                
                $datos->evento=$request->evento;
                $datos->estado=$request->estado;            
                $datos->fecha_inicio=$request->fecha_inicio;
                $datos->fecha_fin=$request->fecha_fin;
                $datos->imagen=$picture;
                $datos->update();
                return response()->json(['result'=>"Registro Exitoso", 'code'=>'201']);
            
            
            }else
                return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }else
            return response()->json(['result'=>"Registro duplicado", 'code'=>'400']);
    }

    public function activo(){
        $datos=Evento::where('estado', 1)->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos , 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Evento::find($id);
        if($datos != null){
           /*  if($datos -> imagen != 'undefined.png' && $datos -> imagen != 'administrador.png'&& $datos -> imagen != 'computacion.png' && $datos -> imagen != 'espam.png'){
                $archivo=substr($datos->imagen,1);
                File::delete($archivo);
            } */
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);  
    }

    public function info()
    {
        $datos=DB::select('SELECT e.id_evento FROM eventos AS e WHERE evento LIKE "Hackathon" AND estado = "1" ORDER BY e.id_evento');
        $eventos = count($datos);
        $participantes=0;
        $proyectos=0;
        if($eventos!=0){
            foreach ($datos as $item) {
                $estudiantes=Estudiante::with('grupo')->where('id_evento',$item->id_evento)->get();
                $participantes+=count($estudiantes);
                $cont=0;
               
                foreach ($estudiantes as $estu) {
                    if($estu['grupo'][0]['grupo']>$cont){
                        $cont=$estu['grupo'][0]['grupo'];
                    }
                }
                $proyectos+=$cont;
            }

            return response()->json(['eventos'=>$eventos , 'participantes'=>$participantes ,'proyectos'=>$proyectos , 'code'=>'201']);

        }else

            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);

    }
    
}
