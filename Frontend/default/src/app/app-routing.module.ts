import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GsistemaGuard } from './guards/gsistema.guard';
import { GusuarioGuard } from './guards/gusuario.guard';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'generargrupos',
        pathMatch: 'full'
      },
      {
        path: 'generargrupos',
        canActivate:[GusuarioGuard],
        loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule)
      },
      {
        path: 'mostrargrupos',
        canActivate:[GusuarioGuard],
        loadChildren: () => import('./pages/grupos/grupos.module').then(m => m.GruposModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }, {
        path: 'login',
        canActivate:[GsistemaGuard],
        loadChildren: () => import('./pages/auth/login/basic-login/basic-login.module').then(m => m.BasicLoginModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('./pages/auth/registration/basic-reg/basic-reg.module').then(m => m.BasicRegModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
