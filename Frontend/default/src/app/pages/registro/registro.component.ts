import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../servicios/estudiantes.service';
import { CarrerasService } from '.././../servicios/carreras.service';
import Swal from 'sweetalert2'
import { GruposService } from '../../servicios/grupos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  conformado=false;
  guardado=false;
  creados=false;

  Datos = [];
  array = [];
  Gestu = [];
  Array_Carrera = [];
  CarreraCon=[];

  participantes="";
  carrera;
  cantidad;
  carreras;
  totalestu;

  list= [];


  ClsCarrera="form-control";
  ClsParticipantes="form-control";
  ClsCantidad="form-control";

  constructor(private estudiante_service: EstudiantesService, private carrera_service: CarrerasService, private grupos_service:GruposService) { }

  cargarCarreras() {
    this.carrera_service.cargar_carreras().then(data =>{
      let array=data['result'];
      
      for (let i = 0; i < array.length; i++) {
       
        let dato = {
          'nombre': array[i].nombre,
          'estado': false
        };

        this.Array_Carrera.push(dato);
      }
    }).catch(error =>{
      console.log(error);
    }); 
   

  }

  agregarR(){
    if(this.carrera==""||this.carrera==undefined|| this.cantidad==""||this.cantidad==undefined){
      if(this.carrera==""||this.carrera==undefined){
        this.ClsCarrera="form-control TxtError";
      }
      if(this.cantidad==""||this.cantidad==undefined){
        this.ClsCantidad="form-control TxtError";
      }

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Datos Incompletos..!'
      })
    }
    else{

      this.totalestu=parseInt(this.participantes);

      for (let i = 0; i < this.CarreraCon.length; i++) {
       
        this.totalestu-=this.CarreraCon[i].cantidad;
       }

      if((this.totalestu-parseInt(this.cantidad))>=0){

        this.totalestu-=parseInt(this.cantidad);

        for (let i = 0; i < this.Array_Carrera.length; i++) {
       
          if(this.Array_Carrera[i].nombre===this.carrera){
           this.Array_Carrera[i].estado=true;
           }
         }
   
         let tama= this.CarreraCon.length;
         let dato = {
           'nombre': this.carrera,
           'cantidad': parseInt(this.cantidad),
           'posi':tama
         };
         this.cantidad="";
         this.carrera=undefined;
         this.CarreraCon.push(dato);
      }else{

        this.ClsCantidad="form-control TxtError";

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: '¡Número de estudiantes superados..!'
        })

      }

    }
  }

  eliminarR(posi,nom){
    
    for (let i = 0; i < this.Array_Carrera.length; i++) {
       
      if(this.Array_Carrera[i].nombre===nom){
       this.Array_Carrera[i].estado=false;
       }
     }

    for(let i = posi; i < this.CarreraCon.length; i++){
      this.CarreraCon[i].posi-=1;
    }

    this.CarreraCon.splice(posi, 1);

  }
  ngOnInit() {
    let dat=
      {id:'1',name:'d'}
    ;
    this.list.push(dat);
    dat=
      {id:'0',name:'d'}
    ;
    this.list.push(dat);
    dat=
      {id:'2',name:'d'}
    ;
    this.list.push(dat);
   
    console.log(this.list);

    this.validar();
    this.cargarCarreras();
  }

  guardar(){

    Swal.fire({
      title: '¿Desea guardar los grupos conformados?',
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#4ea175',
      denyButtonColor: '#FFB64D',
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        let longi=this.Gestu.length;
        for(let i = 0; i < longi; i++){
          let array={
            "nombre":this.Gestu[i]['grupo'],
            "id_estudiante":this.Gestu[i]['id_estudiante']
          }
          
          this.grupos_service.registrar(array).then(data =>{
    
          }).catch(error =>{
            console.log(error);
          });
        
        }
       
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: '¡Guardado Exitoso..!'
        })
    
        this.guardado=true;

      } else if (result.isDenied) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'info',
          title: '¡Proceso cancelado..!'
        })
      }
    })

  }

  conformar() {
    
    if(this.participantes==""||this.participantes==undefined){

      this.ClsParticipantes=" form-control TxtError";
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Datos Incompletos..!'
      })

    }else{
      
      this.estudiante_service.cargar_estudiantes().then(data => {
        this.Datos = data['result'];
        this.agrupar();
        this.conformado=true;
      }).catch(error => {
        console.log(error);
      });
    }

  }

  validar(){
    this.grupos_service.cargar_grupos().then(data =>{
      if(data['code']==201){
        this.creados=true;

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'info',
          title: '¡Los grupos ya se encuentran conformados..!'
        })

      }      
    }).catch(error =>{
      console.log(error);
    });
  }

  agrupar() {
    //debugger
    this.Gestu=[];
    this.array = this.Datos;
    let result = [];
    let random;
    let estuLength = this.array.length;
    let intervalo = estuLength;
    let Grupos = Math.floor(estuLength / parseInt(this.participantes));
    let carrN=0;
    let GrupoEstudiantes;
    //sumar restricciones
    for (let i = 0; i < this.CarreraCon.length; i++) {
        carrN+=this.CarreraCon[i].cantidad;  
    }
    carrN=parseInt(this.participantes)-carrN;
    
    //recorre todos los estudiantes
    for (let i = 0; i < estuLength; i++) {
      random = Math.floor(Math.random() * intervalo); //posicion del estudiante aleatorio
      intervalo--;
      let nuevoLength = result.length; // longitud de los estudiantes con grupos
      let pertenece=false;
      if(carrN==0){
        for (let i = 0; i < this.CarreraCon.length; i++) {
          if(this.CarreraCon[i].nombre === this.array[random]['carrera']['nombre']){
            pertenece=true;
            break;
          }
        }        
      }
      if(pertenece==true){
        //primer participante grupo 1
        if (nuevoLength == 0) {
          
          let dato = {
            'grupo': 1,
            'id_carrera': this.array[random]['id_carrera'],
            'id_estudiante': this.array[random]['id_estudiante'],
            'nombres': this.array[random]['nombres'],
            'cedula':this.array[random]['cedula'],
            'apellidos': this.array[random]['apellidos'],
            'carrera': this.array[random]['carrera']['nombre']
          };

          result.push(dato);
        } else {
          //recorrer por grupos
          for (let j = 1; j <= Grupos + 1; j++) {

            let otraC=true;
            let Cnormales=carrN;
            let pase=true;
            let carrconteo=[];
            GrupoEstudiantes=0;
            
            for (let i = 0; i < this.CarreraCon.length; i++) {
          
              let dato = {
                'nombre': this.CarreraCon[i].nombre,
                'cantidad': this.CarreraCon[i].cantidad
              };
              carrconteo.push(dato);
            }
            //
            let otraCarrera=true;
            //restar nuevo dato del estudiante a la carrera
            for (let i = 0; i < carrconteo.length; i++) {
              
              if (this.array[random]['carrera']['nombre'] === carrconteo[i]['nombre']) {
                  carrconteo[i].cantidad-=1;
                  otraCarrera=false;
                  break;
              }
            }
            if(otraCarrera==true){
              Cnormales-=1;
            }
            //recorre el nuevo array 
            for (let x = 0; x < nuevoLength; x++) {
              
              //contar participantes por grupo
              if (result[x]['grupo'] == j) {
                GrupoEstudiantes+=1;
                otraC=true;
                for (let i = 0; i < carrconteo.length; i++) {
                  
                  if (result[x]['carrera'] === carrconteo[i]['nombre']) {
                    otraC=false;
                    if(carrconteo[i].cantidad>0)
                      carrconteo[i].cantidad-=1;
                    else {
                      pase=false;
                      break;
                    }
                  }
                }
                if(otraC==true){
                  if(Cnormales>0){
                    Cnormales-=1;
                  }else {
                    pase=false;
                  }
                }                 

              }
            }
            

            //validar condición de n° de carreras y n° de participantes
            if (Cnormales >=0 && pase==true &&GrupoEstudiantes<this.participantes) {

              let dato = {
                'grupo': j,
                'id_carrera': this.array[random]['id_carrera'],
                'id_estudiante': this.array[random]['id_estudiante'],
                'nombres': this.array[random]['nombres'],
                'cedula':this.array[random]['cedula'],
                'apellidos': this.array[random]['apellidos'],
                'carrera': this.array[random]['carrera']['nombre']
              };

              result.push(dato);
              break;
            }else if(i<=estuLength && j==Grupos){
              Grupos++;
            }
          }

        }       
      }
      this.array.splice(random, 1);
    }

    debugger
    for (let j = 1; j <= Grupos + 1; j++) {

      for (let x = 0; x <= this.CarreraCon.length; x++) {
          let valor;
          let pase=false;
          if(x==this.CarreraCon.length){
            valor= carrN;
            pase=true;
          }else{
            valor=  this.CarreraCon[x]['cantidad'];
          }
           
        for (let y = 0; y < valor; y++) {

          for (let i = 0; i < result.length; i++) {
          
            if(result[i]['grupo']==j){

              if(pase==true){
                this.Gestu.push(result[i]);
                result.splice(i, 1);
                break;
              }
              else if(result[i]['carrera'] === this.CarreraCon[x]['nombre']) {
                this.Gestu.push(result[i]);
                result.splice(i, 1);
                break;
              }
            }
          
          }
        }
      }
    }

  }
}


