import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarRoutingModule } from './agregar-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AgregarComponent } from './agregar.component';


@NgModule({
  declarations: [AgregarComponent],
  imports: [
    CommonModule,
    AgregarRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AgregarModule { }
