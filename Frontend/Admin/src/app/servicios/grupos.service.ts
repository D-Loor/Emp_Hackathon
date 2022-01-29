import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http:HttpClient) { }

  registrar(data:any){
    let  url = 'http://127.0.0.1:8000/api/Grupo';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);{

        }
      }, error => {
        reject(error);
      });
    });
  }
 
  cargar_estu(id) {
    let  url = 'http://127.0.0.1:8000/api/Grupo/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

   eliminar_estudiante_grupo(id) {
    let  url = 'http://127.0.0.1:8000/api/Grupo/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  eliminar_grupos(id) {
    let  url = 'http://127.0.0.1:8000/api/GrupoEli/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  actualizar(data:any){
    let  url = 'http://127.0.0.1:8000/api/GrupoActualizar';
    return new Promise ((resolve, reject) => {
      this.http.put(url,data).subscribe(res => {
        resolve(res);{

        }
      }, error => {
        reject(error);
      });
    });
  }
  
  validar_grupos(id) {
    let  url = 'http://127.0.0.1:8000/api/ValidarGrupos/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
