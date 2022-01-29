import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MostrarRoutingModule } from './mostrar-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MostrarComponent } from './mostrar.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MostrarComponent],
  imports: [
    CommonModule,
    MostrarRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class MostrarModule { }
