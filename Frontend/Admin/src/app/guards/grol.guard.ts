import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrolGuard implements CanActivate {

  constructor(private rutas:Router){}
  
  canActivate(){
    let inicio = localStorage.getItem('rol');
    if(inicio =="Administrador"){
      return true;
    }else{
      return false;
    }
   
  }
  
  
}
