import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GusuarioGuard implements CanActivate {

  constructor(private rutas:Router){}


  canActivate(){
    let inicio = localStorage.getItem('nombres');
    if(!inicio){
      this.rutas.navigate(["/login"]);
      return false;
    }
    return true;
  }
  
}
