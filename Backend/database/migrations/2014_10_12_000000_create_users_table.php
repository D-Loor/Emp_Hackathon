<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->bigIncrements('id_usuario');
            $table->string('nombres');
            $table->string('correo')->unique();
            $table->string('password');
            $table->string('rol');
        });

        DB::table("usuarios")
        ->insert([
            "nombres" => "Administrador",
            "correo" => "admin@espam.edu.ec",
            "password" => "admin",
            "rol" => "Administrador",
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
