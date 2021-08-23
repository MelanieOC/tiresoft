import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from 'src/app/components/components.module';

import { MaintenanceVehicleRoutingModule } from './maintenance-vehicle-routing.module';
import { MaintenanceVehicleComponent } from './maintenance-vehicle.component';
import { RegisterVehicleComponent } from './register-vehicle/register-vehicle.component';


@NgModule({
  declarations: [
    MaintenanceVehicleComponent, 
    RegisterVehicleComponent
  ],
  imports: [
    CommonModule,
    MaintenanceVehicleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ComponentsModule
  ]
})
export class MaintenanceVehicleModule { }
