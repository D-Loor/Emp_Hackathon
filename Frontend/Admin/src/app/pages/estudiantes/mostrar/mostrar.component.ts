import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../../servicios/estudiantes.service';
import Swal from 'sweetalert2';
import { EventosService } from '../../../servicios/eventos.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  even="";
  buscado="";
  estudiantes=[];
  eventos=[];
  

  ClsEvento="form-control";
  constructor(private estudiantes_service:EstudiantesService,private eventos_service:EventosService) { }

  ngOnInit() {
    this.cargar_even();
  }
  
  cargar_even(){
    this.eventos_service.cargar().then(data =>{
      if(data['code']==201){
        this.eventos=data['result'];
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
          icon: 'info',
          title: '¡No hay eventos registrados..!'
        })
      }
      
    }).catch(error =>{
      console.log(error);
    });
  }

  cargar_estu(pase){

    if(this.even==""|| this.even== undefined){
      this.ClsEvento="form-control TxtError";
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
        title: '¡Debe seleccionar un Evento..!'
      })

    }else{
      if(pase==1)
        this.buscado=this.even;
      
      this.estudiantes=[];
      this.estudiantes_service.cargar_estu_evento(this.buscado).then(data =>{
      if(data['code']==201){
        this.estudiantes=data['result'];
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
          icon: 'info',
          title: '¡No hay estudiantes registrados en este evento..!'
        })
      }
      
    }).catch(error =>{
      console.log(error);
    });

    }
   
  }

  eliminar_estu(id, nombre,apellido){

    Swal.fire({
      title: '¿Desea eliminar el estudiante: '+apellido+' '+nombre+'?',
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#FFB64D',
      denyButtonColor: '#9e9e9e',
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.estudiantes_service.eliminar_estudiante(id).then(data =>{
          if(data['code']==201){
            this.cargar_estu(0);
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
              title: '¡Estudiante Eliminado..!'
            });
          }
          
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
