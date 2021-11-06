import { Component, OnInit } from '@angular/core';
import { GruposService } from '../../servicios/grupos.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  Gestu=[];
  today = new Date();
  fecha:string;
  grupos=false;
  constructor(private grupos_service:GruposService) { }

  ngOnInit() {
    this.fecha=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar();
  }

  eliminar(){
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

        this.grupos_service.eliminar_grupos().then(data =>{
          if(data['code']==201){
            this.grupos=false
            this.Gestu=[];
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
    window.open('http://127.0.0.1:8000/api/ReporteGrupos/'+this.fecha, '_blank');

  }
  cargar(){
    this.grupos_service.cargar_grupos().then(data =>{
      if(data['code']==201){
        this.Gestu=data['result'];
        this.grupos=true;
        console.log(this.Gestu);
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
          title: '¡No existen grupos conformados..!'
        })
      }
      
    }).catch(error =>{
      console.log(error);
    });
  }
}
