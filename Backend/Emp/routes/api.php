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
Route::delete('GrupoEli','App\Http\Controllers\GrupoController@eliminar');

//reportes
Route::get('ReporteGrupos/{fecha}','App\Http\Controllers\GrupoController@GenerarPDF');