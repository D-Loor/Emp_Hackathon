import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private http:HttpClient) { }

  cargar_carreras() {
    let  url = 'https://app-hackathon-espam.herokuapp.com/api/Carrera';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
