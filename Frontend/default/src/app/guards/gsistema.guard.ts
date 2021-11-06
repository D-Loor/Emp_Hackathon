import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GsistemaGuard implements CanActivate {
  
  constructor(private rutas:Router){}


  canActivate(){
    let inicio = localStorage.getItem('nombres');
    if(inicio){
      this.rutas.navigate(["/generargrupos"]);
      return false;
    }
    return true;
  }
  
}
