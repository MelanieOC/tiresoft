import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceTireRoutingModule } from './maintenance-tire-routing.module';
import { MaintenanceTireComponent } from './maintenance-tire.component';


@NgModule({
  declarations: [MaintenanceTireComponent],
  imports: [
    CommonModule,
    MaintenanceTireRoutingModule
  ]
})
export class MaintenanceTireModule { }
