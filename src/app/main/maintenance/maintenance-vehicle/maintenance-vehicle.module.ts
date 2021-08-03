import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceVehicleRoutingModule } from './maintenance-vehicle-routing.module';
import { MaintenanceVehicleComponent } from './maintenance-vehicle.component';


@NgModule({
  declarations: [MaintenanceVehicleComponent],
  imports: [
    CommonModule,
    MaintenanceVehicleRoutingModule
  ]
})
export class MaintenanceVehicleModule { }
