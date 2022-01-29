<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Reporte {{$evento->evento}}</title>

    <style>

        @page {
            margin-top:0px;
            margin-bottom:0px;
            margin-right:20px;
            margin-left:3px;
           
        }
      
        
        /* #header { position: fixed; left: 0px; top: 0; right: 0px; height: 150px; text-align: center; } */
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
        h4{
            padding-bottom: 0px !important;
            margin-bottom: 0px !important;
        }

        table{
            margin-top:20px;
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
        .titulos{
            width: 30px !important;
            background-color: rgb(209, 209, 209);
        }
        /*
        rgb(171, 198, 99)
        rgb(104, 169, 85)
        rgb(129, 186, 157)

        */
        .f1{
            width: 30px !important;
            background-color: #ffda9e;
        }
        .f2{
            width: 30px !important;
            background-color: #d8f79a ;
        }
        .f3{
            width: 30px !important;
            background-color: #add5fa;
        }
        .f4{
            width: 30px !important;
            background-color: #fdf9c4;
        }
        .f5{
            width: 30px !important;
            background-color: #b0f2c2;
        }
        .f6{
            width: 30px !important;
            background-color: #fabfb7;
        }
        .f7{
            width: 30px !important;
            background-color: #fdfd96;
        }
        .f8{
            width: 30px !important;
            background-color: #95b8f6;
        }
        .f9{
            width: 30px !important;
            background-color: #ff9688;           
        }
        .f10{
            width: 30px !important;
            background-color: #d3bcf6;
        }
        
    </style>
</head>
<body>

   
  <div class="contenedor">
    
  <!-- <div id="header">
    <h1>Widgets Express</h1>
  </div> -->

    <img src="imagenes/espam.png" class="logo1">
    <?php echo "<img class='logo2' src='imagenes/".$evento->imagen."' alt=''>" ?>

    <div class="contenido">

        <div>
            <h4> Reporte {{$evento->evento}}</h4>
        </div>
    
        <table class="espacios">
            <thead>

                <tr class="titulos">
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
                        @if ( $item->grupo == 1) 
                            <th class="f1">{{$item->grupo}}</th>
                        @endif   
                        @if ( $item->grupo == 2) 
                            <th class="f2">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 3) 
                            <th class="f3">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 4) 
                            <th class="f4">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 5) 
                            <th class="f5">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 6) 
                            <th class="f6">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 7) 
                            <th class="f7">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 8) 
                            <th class="f8">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 9) 
                            <th class="f9">{{$item->grupo}}</th>
                        @endif
                        @if ( $item->grupo == 10) 
                            <th class="f10">{{$item->grupo}}</th>
                        @endif

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
        


</div>


</body>
</html>
