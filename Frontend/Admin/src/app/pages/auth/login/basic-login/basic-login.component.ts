import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../../servicios/usuarios.service';
import {Router} from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  correo="";
  pass="";

  ClsCorreo="";
  ClsPass="";
  constructor(public ruta:Router,private usuarios_service:UsuariosService) { }

  ngOnInit() {
       // document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  validar(){
    if(this.correo== undefined|| this.correo=="" ||this.pass== undefined|| this.pass==""){
     
      if(this.correo== undefined|| this.correo==""){
        this.ClsCorreo="TxtError";
      }
      if(this.pass== undefined|| this.pass==""){
        this.ClsPass="TxtError";     
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
      this.usuarios_service.autentificar(this.correo,this.pass).then(data =>{

        if(data['code']==201){
          
          localStorage.setItem('nombres', data['result'][0]['nombres']);
          localStorage.setItem('correo', data['result'][0]['correo']);
          localStorage.setItem('rol', data['result'][0]['rol']);

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
            title: 'Bienvenido '+data['result'][0]['nombres']+'.'
          })
          this.ruta.navigate(['/']);
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
            icon: 'error',
            title: '¡Correo o contraseña incorrecta..!'
          })
  
         
        }
        
      }).catch(error =>{
        console.log(error);
      });
    }
  }

}

