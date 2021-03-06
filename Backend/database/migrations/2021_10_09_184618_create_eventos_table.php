<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('eventos', function (Blueprint $table) {
            $table->bigIncrements('id_evento');
            $table->string('evento');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->boolean('estado');
            $table->string('imagen');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventos');
    }
}
