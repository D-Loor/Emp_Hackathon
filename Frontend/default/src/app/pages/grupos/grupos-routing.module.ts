import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GruposComponent } from './grupos.component';


const routes: Routes = [
  {
    path: '',
    component: GruposComponent,
    data: {
      breadcrumb: 'Mostrar Grupos',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
