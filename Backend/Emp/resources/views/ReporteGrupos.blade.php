<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte Hackathon</title>

    <style>

        @page {
            margin-top:0px;
            margin-bottom:0px;
            margin-right:20px;
            margin-left:3px;
           
        }
      
        *{
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

        }
        .logo1{
            margin-top:20px;
            height:90px;
            weight:150px;
        }
        .logo2{
            margin-top:20px;
            float:right;
            height:80px;
            weight:120px;
        }
        img{
            padding-top:75px;
            padding:0px;
            margin:0px;
        }
        .contenedor{
            padding:50px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        table{
            padding-top:10px;
            border-collapse: collapse;
            text-align: center;
        }
        th,td {
                min-width: 100px;
                width: 20px;
                min-height: 20px;
                height: 20px;
                padding: 5px;
                font-size: 14px;
                text-align: center;
                border: solid 1px black;
        }
        /* .espacios {
            table-layout: fixed;
            width: 670px;
        } */
        .grupo{
            width: 30px !important;
        }
        .nombres{
            width: 145px !important;
        }
        .cedula{
            width: 90px !important;
        }
        .carrera{
            width: 185px !important;
        }

        .fecha{
            top: 98%;
            position:absolute;
        }
    </style>
</head>
<body>

   
  <div class="contenedor">

    <img src="imagenes/espam.png" class="logo1">
    <img src="imagenes/hackathon.png" class="logo2">

    <!-- <h4 class="titu">REGISTRO DE LAS 20 PRINCIPALES CAUSAS DE MORBILIDAD EN REHABILITACIÓN FÍSICA</h4> -->
    <div class="contenido">

    <div>
        <h4>Green Hackathon Agrotech</h4>
    </div>
        <!-- <div >
            <div class="items">
            <span class="item ">PROVINCIA:</span>
                MANABÍ
            <span class="item subt">MES:</span>
                
            <span class="item subt">AÑO:</span>
                
            </div>

        </div> -->

        <table class="espacios">
            <thead>

                <tr>
                    <th class="grupo"> Grupo</th>
                    <th class="nombres"> Nombres</th>
                    <th class="nombres"> Apellidos</th>
                    <th class="cedula"> Cédula</th>
                    <th class="carrera"> Carrera</th>
                </tr>
                               
            </thead>
            <tbody>
                @foreach ($datos as $item)

                    <tr>
                        <td class="grupo">{{$item->grupo}}</td>
                        <td class="nombres">{{$item->nombres}}</td>
                        <td class="nombres">{{$item->apellidos}}</td>
                        <td class="cedula">{{$item->cedula}}</td>
                        <td class="carrera">{{$item->nombre}}</td>
                        
                    </tr>
                @endforeach
                    
               

            </tbody>
            <tfoot>
                
            </tfoot>
        </table>
    </div>
    
    <div class="fecha">
        <spam> Reporte generado el {{$dia}} de {{$mes}} de {{$anio}}</spam>
    </div>
        <!-- <div>
            <div class="doc">
                <div class="firma"></div>
                <div class="antFirma">LCDO. CARLOS ZAMBRANO M.</div>
                    <div class="cargo"> ÁREA  DE  REHABILITACIÓN FÍSICA
                </div>

            </div>

        </div> -->


</div>


</body>
</html>
