import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './eventos.component';


const routes: Routes = [
  {
    path: '',
    component: EventosComponent,
    data: {
      breadcrumb: 'Eventos',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
