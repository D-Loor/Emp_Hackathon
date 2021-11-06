import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private http:HttpClient) { }

  cargar_carreras() {
    let  url = 'http://127.0.0.1:8000/api/Carrera';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
