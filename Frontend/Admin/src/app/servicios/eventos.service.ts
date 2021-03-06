import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  eliminar_estudiante(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  registrar(data:any){
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/Evento';

    var formData = new FormData();
    formData.append('evento', data.evento);
    formData.append('fecha_inicio', data.fecha_inicio);
    formData.append('fecha_fin', data.fecha_fin);
    formData.append('estado', data.estado);
    formData.append('imagen', data.imagen);

    return new Promise ((resolve, reject) => {
      this.http.post(url,formData).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  actualizar(data:any){
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/actualizarEvento';
    var formData = new FormData();
    formData.append('id_evento', data.id_evento);
    formData.append('evento', data.evento);
    formData.append('fecha_inicio', data.fecha_inicio);
    formData.append('fecha_fin', data.fecha_fin);
    formData.append('estado', data.estado);
    formData.append('imagen', data.imagen);

    return new Promise ((resolve, reject) => {
      this.http.post(url,formData).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  cargar() {
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/Evento';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  activo(){
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/EventoActivo';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(id) {
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/Evento/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

}
