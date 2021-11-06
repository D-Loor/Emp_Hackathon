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
  cargar_grupos() {
    let  url = 'http://127.0.0.1:8000/api/Grupo';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

   eliminar_grupos() {
    let  url = 'http://127.0.0.1:8000/api/GrupoEli';
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  
}
