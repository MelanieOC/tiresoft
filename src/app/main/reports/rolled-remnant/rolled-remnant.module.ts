import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolledRemnantRoutingModule } from './rolled-remnant-routing.module';
import { RolledRemnantComponent } from './rolled-remnant.component';

import { MaterialModule } from 'src/app/material/material.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [RolledRemnantComponent],
  imports: [
    CommonModule,
    RolledRemnantRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class RolledRemnantModule { }
