import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicRegComponent } from './basic-reg.component';
import {BasicRegRoutingModule} from './basic-reg-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    BasicRegRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [BasicRegComponent]
})
export class BasicRegModule { }
