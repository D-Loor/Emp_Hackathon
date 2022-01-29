import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicRegComponent} from './basic-reg.component';

const routes: Routes = [
  {
    path: '',
    component: BasicRegComponent,
    data: {
      breadcrumb: 'Registro Estudiantes',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRegRoutingModule { }
