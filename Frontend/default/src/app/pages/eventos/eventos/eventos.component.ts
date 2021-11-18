import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../servicios/eventos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  array_eventos=[];
  evento="";
  estado="";
  fecha_ini= new Date();
  fecha_fin= new Date();
  id_editar="";
  actualizar=false;

  today = new Date();
  fechaActual:string;
  fechaVal=true;
  
  ClsEstado="form-control";
  ClsFecha1="form-control";
  ClsFecha2="form-control";
  ClsEvento="form-control";

  constructor(private evento_service: EventosService) { }


  validarFecha(){
    if(this.fecha_ini >= this.fecha_fin){
      this.fechaVal=false;
      this.ClsFecha1=" form-control TxtError";   
      this.ClsFecha2=" form-control TxtError"; 
      this.fecha_ini=null;
      this.fecha_fin=null;

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
        title: '¡Fechas Incorrectas..!'
      })

    }else
      this.fechaVal=true;

  }
  ngOnInit() {
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.Cevento();
  }
  
  Cevento(){
    this.array_eventos=[];
    this.evento_service.cargar().then(data =>{
      
      if(data['code']==201){
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
          title: '¡No hay Eventos registrados..!'
        })
      }
    }).catch(error =>{
      console.log(error);
    });

  }

  eliminar(id, nombre){

    Swal.fire({
      title: '¿Desea eliminar el evento: '+nombre+'?',
      text: "Se borrarán todos los estudiantes registrados en el.",
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#FFB64D',
      denyButtonColor: '#9e9e9e',
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.evento_service.eliminar(id).then(data =>{
          if(data['code']==201){
            this.limpiar();
            this.actualizar=false;
            this.Cevento();
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
              title: '¡Evento Eliminado..!'
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

  editar(id,evento,fecha1,fecha2,estado){
    this.limpiar();
    this.actualizar=true;
    this.id_editar=id;
    this.evento=evento;
    this.fecha_ini=fecha1;
    this.fecha_fin=fecha2;
    this.estado=estado;
  }

  Registrar(){
        
    if(this.evento== undefined|| this.evento=="" ||this.fecha_ini== undefined|| this.fecha_ini== null||this.fecha_fin== undefined|| this.fecha_fin==null ||this.estado==""||this.estado==undefined){
    
      if(this.evento== undefined|| this.evento=="" ){
        this.ClsEvento="form-control TxtError";
      }
      if(this.fecha_ini== undefined|| this.fecha_ini==null){
        this.ClsFecha1=" form-control TxtError";     
      }
      if(this.fecha_fin== undefined|| this.fecha_fin==null ){
        this.ClsFecha2="form-control TxtError";      
      }
      if(this.estado==""||this.estado==undefined){
        this.ClsEstado="form-control TxtError";      
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


    }else{
      this.validarFecha();
      if(this.fechaVal){
        Swal.fire({
          title: '¿Desea registrar evento?',
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
              "evento":this.evento,
              "fecha_inicio":this.fecha_ini,
              "fecha_fin":this.fecha_fin,
              "estado":this.estado
            }
            
            this.evento_service.registrar(array).then(data =>{
      
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
                  title: 'Evento ya se encuentra registrado.'
                })
        
              }else if(data['code']==201){
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
        
                this.Cevento();
              }
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

  Actualizar(){
    

    if(this.evento== undefined|| this.evento=="" ||this.fecha_ini== undefined|| this.fecha_ini== null||this.fecha_fin== undefined|| this.fecha_fin==null){
    
      if(this.evento== undefined|| this.evento=="" ){
        this.ClsEvento="form-control TxtError";
      }
      if(this.fecha_ini== undefined|| this.fecha_ini==null){
        this.ClsFecha1=" form-control TxtError";     
      }
      if(this.fecha_fin== undefined|| this.fecha_fin==null ){
        this.ClsFecha2="form-control TxtError";      
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


    }else{
      this.validarFecha();
      if(this.fechaVal){
        Swal.fire({
          title: '¿Desea actualizar datos del evento?',
          showDenyButton: true,
          showCancelButton: false,
          showCloseButton: true,      
          confirmButtonColor: '#4ea175',
          denyButtonColor: '#FFB64D',
          confirmButtonText: 'Actualizar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
    
            let array={
              "id_evento":this.id_editar,
              "evento":this.evento,
              "fecha_inicio":this.fecha_ini,
              "fecha_fin":this.fecha_fin,
              "estado":this.estado
            }
            
            this.evento_service.actualizar(array).then(data =>{
      
              if(data['code']==400){
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
                  icon: 'info',
                  title: 'Nombre de Evento ya se encuentra registrado.'
                })
                
              }else if(data['code']==201){
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
                  title: '¡Actualización Exitosa..!'
                })
                this.limpiar();
                this.Cevento();
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
  }

  nuevo(){
    this.actualizar=false;
    this.limpiar();
  }

   limpiar(){
    this.ClsEstado="form-control";
    this.ClsFecha1="form-control";
    this.ClsFecha2="form-control";
    this.ClsEvento="form-control";

    this.id_editar="";
    this.evento="";
    this.fecha_ini=null;
    this.fecha_fin=null;
    this.estado="";
    this.actualizar=false;
  }
}
