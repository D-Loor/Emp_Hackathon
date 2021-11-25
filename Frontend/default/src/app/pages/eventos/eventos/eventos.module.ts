import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { EventosComponent } from './eventos.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [EventosComponent],
  imports: [
    CommonModule,
    EventosRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class EventosModule { }
