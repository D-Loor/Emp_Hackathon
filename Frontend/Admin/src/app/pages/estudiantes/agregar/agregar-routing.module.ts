import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './agregar.component';


const routes: Routes = [
  {
    path: '',
    component: AgregarComponent,
    data: {
      breadcrumb: 'Agregar Estudiante',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarRoutingModule { }
