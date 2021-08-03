import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolledRemnantRoutingModule } from './rolled-remnant-routing.module';
import { RolledRemnantComponent } from './rolled-remnant.component';


@NgModule({
  declarations: [RolledRemnantComponent],
  imports: [
    CommonModule,
    RolledRemnantRoutingModule
  ]
})
export class RolledRemnantModule { }
