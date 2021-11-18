import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../../servicios/estudiantes.service';
import { CarrerasService } from '../../../servicios/carreras.service';
import { EventosService } from '../../../servicios/eventos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  constructor(private evento_service: EventosService, private estudiante_service:EstudiantesService, private carrera_service:CarrerasService) { }

  nombres="";
  apellidos="";
  cedula="";
  evento="";
  carrera="";
  registro=false;
  invalido=false;
  eventoa=false;

  ClsNombres="form-control";
  ClsEvento="form-control";
  ClsApellidos="form-control";
  ClsCedula="form-control";
  ClsCarrera="form-control";

  array_eventos=[];
  array_carreras=[];
  
  ngOnInit() {
    this.Cevento();
    this.carreras();
  }


  limpiar(){
    this.nombres="";
    this.apellidos="";
    this.cedula="";
    this.carrera="";
    this.evento="";
  }

  validarC() {

    let num = 0;
    let array =this.cedula.split(""); 
    num=array.length; 

      if( num==10) { 
          let total=0; 
          let digito=(parseInt(array[9])*1); 
          for(let i=0;i<(num-1);i++) {
              if((i%2)!=0){ 
                  total=total+(parseInt(array[i])*1); 
              } else {
                  let mult=parseInt(array[i])*2; 
                  if(mult>9)
                  total=total+(mult-9);
                  else total=total+mult; 
              } 
          } 
          let decena=total/10; 
          decena=Math.floor(decena); 
          decena=(decena+1)*10; 
          let final=(decena-total); 
          if((final==10 && digito==0)||(final==digito)) { 
            //console.log('la cedula:' + this.cedula + ' es correcta');
            this.invalido=false;
          } else {  
            //console.log('la cedula:' + this.cedula + ' es incorrecta');
            this.invalido=true;

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
              title: '¡Cédula Incorrecta..!'
            })
            this.ClsCedula="form-control TxtError";
              
          } 
      }
      else {  
        //console.log('la cedula:' + this.cedula + ' es incorrecta');
        this.ClsCedula="form-control TxtError";
        this.invalido=true;
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
          title: '¡Cédula Incorrecta..!'
        })

      } 
              
  }

  Cevento(){
    this.evento_service.activo().then(data =>{
      
      if(data['code']==201){
        this.eventoa=true;
        this.array_eventos=data['result'];
      } else{

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
          title: '¡No hay eventos disponibles por el momento..!'
        })
      }
    }).catch(error =>{
      console.log(error);
    });

  }

  carreras(){
    this.carrera_service.cargar_carreras().then(data =>{
      this.array_carreras=data['result'];
    }).catch(error =>{
      console.log(error);
    });
  }

  Registrar(){
    if(this.nombres== undefined|| this.nombres=="" ||this.apellidos== undefined|| this.apellidos==""||this.cedula== undefined|| this.cedula=="" ||this.carrera==""||this.evento==""){
     
      if(this.nombres== undefined|| this.nombres==""){
        this.ClsNombres="form-control TxtError";
      }
      if(this.apellidos== undefined|| this.apellidos==""){
        this.ClsApellidos=" form-control TxtError";     
      }
      if(this.cedula== undefined|| this.cedula==""){
        this.ClsCedula="form-control TxtError";      
      }
      if(this.carrera==""){
        this.ClsCarrera="form-control TxtError";      
      }
      if(this.evento==""){
        this.ClsEvento="form-control TxtError";      
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
        title: '¡Formulario Incompleto..!'
      })


    }else
    {
      Swal.fire({
        title: '¿Desea registrar estudiante?',
        showDenyButton: true,
        showCancelButton: false,
        showCloseButton: true,      
        confirmButtonColor: '#4ea175',
        denyButtonColor: '#FFB64D',
        confirmButtonText: 'Registrar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
  
          let array={
            "nombres":this.nombres,
            "apellidos":this.apellidos,
            "cedula":this.cedula,
            "id_carrera":this.carrera,
            "id_evento":this.evento
          }
          
          this.estudiante_service.registrar(array).then(data =>{
    
            if(data['code']==400){
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
                title: 'Estudiante ya se encuentra registrado.'
              })
      
            }else{
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
                title: '¡Registro Exitoso..!'
              })
      
             
            }
           this.registro=true;
            this.limpiar();
          }).catch(error =>{
            console.log(error);
          });
         
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
  }
}
