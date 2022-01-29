import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import {SharedModule} from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { OrdenarPipe } from '../../pipes/ordenar/ordenar.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
    ],
  declarations: [RegistroComponent,OrdenarPipe]
})
export class RegistroModule { }
