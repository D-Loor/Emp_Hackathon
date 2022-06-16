import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  array_usuarios=[];
  nombres;
  correo;
  password;
  actualiza=false;
  idactualizar;
p:any;
  ClsNombre='form-control';
  ClsCorreo='form-control';
  ClsPass='form-control';

  constructor(private usuarios_service:UsuariosService) { }

  ngOnInit() {
    this.cargar();
  }

  registrar(){
    if(this.nombres== undefined|| this.nombres=="" ||this.correo== undefined|| this.correo==""||this.password== undefined|| this.password=="" ){
    
      if(this.nombres== undefined|| this.nombres=="" ){
        this.ClsNombre=" form-control TxtError";     
      }
      if(this.correo== undefined|| this.correo== "" ){
        this.ClsCorreo="form-control TxtError";      
      }
      if(this.password== undefined|| this.password==""){
        this.ClsPass="form-control TxtError";      
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
      
        Swal.fire({
          title: '¿Desea registrar usuario?',
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
              "correo":this.correo,
              "password":this.password,
              "rol":"Moderador"
            }
            
            this.usuarios_service.registrar(array).then(data =>{
      
              if(data['code']==400){
                this.ClsCorreo="form-control TxtError";
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
                  title: 'Correo ya se encuentra registrado.'
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
                this.limpiar();
                this.cargar();
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

  limpiar(){
    this.idactualizar="";
    this.nombres="";
    this.correo="";
    this.password="";
    this.actualiza=false;
  }

  actualizar(){
    if(this.nombres== undefined|| this.nombres=="" ||this.correo== undefined|| this.correo== null||this.password== undefined|| this.password==null ){
    
      if(this.nombres== undefined|| this.nombres=="" ){
        this.ClsNombre=" form-control TxtError";     
      }
      if(this.correo== undefined|| this.correo== null ){
        this.ClsCorreo="form-control TxtError";      
      }
      if(this.password== undefined|| this.password==null){
        this.ClsPass="form-control TxtError";      
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
      
        Swal.fire({
          title: '¿Desea actualizar este usuario?',
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
              "id_usuario":this.idactualizar,
              "nombres":this.nombres,
              "correo":this.correo,
              "password":this.password,
              "rol":"Moderador"
            }
            
            this.usuarios_service.actualizar(array).then(data =>{
      
              if(data['code']==400){
                this.ClsCorreo="form-control TxtError";
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
                  title: 'Correo ya se encuentra registrado.'
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
                this.cargar();
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

  eliminar(id, nombre){
    Swal.fire({
      title: '¿Desea eliminar usuario: '+nombre+'?',
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,      
      confirmButtonColor: '#FFB64D',
      denyButtonColor: '#9e9e9e',
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarios_service.eliminar(id).then(data =>{
          if(data['code']==201){
            this.limpiar();
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
              title: '¡Usuario Eliminado..!'
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

  cargar(){
    this.array_usuarios=[];
    this.usuarios_service.cargar().then(data =>{
      
      if(data['code']==201){
        
        this.array_usuarios=data['result'];
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
          title: '¡No hay Usuarios registrados..!'
        })
      }
    }).catch(error =>{
      console.log(error);
    });
  }

  editar(id_usuario,nombres,correo,password){
    this.ClsNombre='form-control';
    this.ClsCorreo='form-control';
    this.ClsPass='form-control';
    this.idactualizar=id_usuario;
    this.nombres=nombres;
    this.correo=correo;
    this.password=password;
    this.actualiza=true;
    window.scroll(0,0);
  }
}
