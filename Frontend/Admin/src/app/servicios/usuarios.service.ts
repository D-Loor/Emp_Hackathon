import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  autentificar(correo,pass){
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/ValidarUsuario/'+correo+'/'+pass;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  registrar(data:any){
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/IngresarUsuario';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);{

        }
      }, error => {
        reject(error);
      });
    });
  }
  cargar() {
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/MostrarUsuarios';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  actualizar(data:any){
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/ActualizarUsuario';
    return new Promise ((resolve, reject) => {
      this.http.put(url,data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
   eliminar(id) {
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/EliminarUsuario/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
