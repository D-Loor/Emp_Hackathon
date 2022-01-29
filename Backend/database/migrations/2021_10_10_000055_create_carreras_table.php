<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarrerasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carreras', function (Blueprint $table) {
            $table->bigIncrements('id_carrera');
            $table->string('nombre');
            $table->boolean('estado');

        });

        DB::table("carreras")
        ->insert([
            "nombre" => "Administración de Empresas",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Administración Pública",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Agroindustria",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Computación",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Ingeniería Agrícola",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Ingeniería Ambiental",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Medicina Veterinaria",
            "estado" => 1,
        ]);
        DB::table("carreras")
        ->insert([
            "nombre" => "Turismo",
            "estado" => 1,
        ]);
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carreras');
    }
}
