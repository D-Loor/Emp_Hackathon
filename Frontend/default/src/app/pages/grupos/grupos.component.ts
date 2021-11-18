import { Component, OnInit } from '@angular/core';
import { GruposService } from '../../servicios/grupos.service';
import Swal from 'sweetalert2'
import { EventosService } from '../../servicios/eventos.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  Gestu=[];
  eventos=[];
  Grupos=[];

  nombres="";
  cedula="";
  evento="";
  carrera="";
  grupo=null;
  gconf=false;

  today = new Date();
  fecha:string;
  even=null;
  actualizar=false;
  id_actualizar;
  grupo_actualizar;

  ClsEvento="form-control";
  ClsGrupo="form-control";

  constructor(private eventos_service:EventosService, private grupos_service:GruposService) { }

  ngOnInit() {
    this.fecha=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar_even();
  }

  eliminar(){
    this.actualizar=false;
    Swal.fire({
      title: '¿Desea eliminar los grupos conformados?',
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#FFB64D',
      denyButtonColor: '#9e9e9e',
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.grupos_service.eliminar_grupos(this.even).then(data =>{
          if(data['code']==201){
            this.Gestu=[];
            this.cargar();
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
              title: '¡Grupos Eliminados..!'
            })
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

  reporte(){
    window.open('http://127.0.0.1:8000/api/ReporteGrupos/'+this.even+'/'+this.fecha, '_blank');
  }

  cargar(){
    this.Gestu=[];
    this.Grupos=[];
    this.grupos_service.cargar_estu(this.even).then(data =>{
      if(data['code']==201){
        this.gconf=true;
        this.Gestu=data['result'];

        for (let i = 1; i <= this.Gestu[this.Gestu.length-1].grupo; i++) {
          this.Grupos.push(i);          
        }
        
      }else{
        this.gconf=false;
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
          title: '¡No existen grupos conformados en este evento..!'
        })
      }
      
    }).catch(error =>{
      console.log(error);
    });
  }

  cargar_even(){
    this.eventos_service.activo().then(data =>{
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
          title: '¡No hay eventos disponibles por el momento..!'
        })
      }
      
    }).catch(error =>{
      console.log(error);
    });
  }

  editar(id,grupo,nombres,apellidos,carrera,cedula){
    this.actualizar=true;
    this.carrera=carrera;
    this.nombres=nombres+" "+apellidos;
    this.id_actualizar=id;
    this.grupo=grupo;
    this.grupo_actualizar=grupo;
    this.cedula=cedula;
  }

  eliminarestu(id_grupo,nombres,apellidos,grupo){
    Swal.fire({
      title: '¿Desea eliminar a '+nombres+' '+ apellidos+' del grupo '+grupo+'?',
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#FFB64D',
      denyButtonColor: '#9e9e9e',
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.grupos_service.eliminar_estudiante_grupo(id_grupo).then(data =>{
          
          if(data['code']==201){
            
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
              title: '¡Grupos Eliminados..!'
            })
          }
          else{
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
              title: '¡Registro no encontrado..!'
            })
          }
          this.cargar();
          
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

  Actualizar(){
    Swal.fire({
      title: '¿Desea cambiar a '+this.nombres+' al grupo '+this.grupo+'?',
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#4ea175',
      denyButtonColor: '#9e9e9e',
      confirmButtonText: 'Actualizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let dato={
          "id_grupo":this.id_actualizar,
          "grupo":this.grupo
        }

        this.grupos_service.actualizar(dato).then(data =>{
          
          if(data['code']==201){
            
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
              title: 'Cambio Realizado..!'
            })
          }
          else{
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
              title: '¡Registro no encontrado..!'
            })
          }
          this.cargar();
          
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
