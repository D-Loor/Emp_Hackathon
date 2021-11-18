<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('ValidarUsuario/{correo}/{pass}','App\Http\Controllers\UsuarioController@Autentificar');
Route::resource('Carrera','App\Http\Controllers\CarreraController');
Route::resource('Estudiante','App\Http\Controllers\EstudianteController');
Route::resource('Grupo','App\Http\Controllers\GrupoController');
Route::resource('Evento','App\Http\Controllers\EventoController');
Route::get('EventoActivo','App\Http\Controllers\EventoController@activo');
Route::delete('GrupoEli/{id}','App\Http\Controllers\GrupoController@eliminar');
Route::put('EventoActualizar','App\Http\Controllers\EventoController@update');
Route::put('GrupoActualizar','App\Http\Controllers\GrupoController@update');
Route::get('ValEstudiante/{id}','App\Http\Controllers\EstudianteController@validar');
//reportes
Route::get('ReporteGrupos/{id}/{fecha}','App\Http\Controllers\GrupoController@GenerarPDF');