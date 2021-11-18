import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventosModule } from '../pages/eventos/eventos/eventos.module';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http:HttpClient) { }


  registrar(data:any){
    let  url = 'http://127.0.0.1:8000/api/Estudiante';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  cargar_estudiantes() {
    let  url = 'http://127.0.0.1:8000/api/Estudiante';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  validar_estu_evento(evento) {
    let  url = 'http://127.0.0.1:8000/api/ValEstudiante/'+evento;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  cargar_estu_evento(evento) {
    let  url = 'http://127.0.0.1:8000/api/Estudiante/'+evento;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  eliminar_estudiante(id) {
    let  url = 'http://127.0.0.1:8000/api/Estudiante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
