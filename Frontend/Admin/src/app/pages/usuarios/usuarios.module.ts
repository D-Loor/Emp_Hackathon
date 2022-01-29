import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosComponent } from './usuarios.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class UsuariosModule { }
