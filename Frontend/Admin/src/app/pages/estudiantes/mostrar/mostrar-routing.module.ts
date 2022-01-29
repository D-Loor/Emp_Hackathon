import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostrarComponent } from './mostrar.component';


const routes: Routes = [
  {
    path: '',
    component: MostrarComponent,
    data: {
      breadcrumb: 'Mostrar Estudiantes',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MostrarRoutingModule { }
