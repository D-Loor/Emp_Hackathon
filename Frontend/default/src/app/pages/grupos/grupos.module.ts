import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { GruposComponent } from './grupos.component';


@NgModule({
  declarations: [GruposComponent],
  imports: [
    CommonModule,
    GruposRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class GruposModule { }
