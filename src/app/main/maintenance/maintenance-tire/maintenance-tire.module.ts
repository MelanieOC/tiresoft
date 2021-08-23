import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from 'src/app/components/components.module';

import { MaintenanceTireRoutingModule } from './maintenance-tire-routing.module';
import { MaintenanceTireComponent } from './maintenance-tire.component';
import { RegisterTireComponent } from './register-tire/register-tire.component';


@NgModule({
  declarations: [MaintenanceTireComponent, RegisterTireComponent],
  imports: [
    CommonModule,
    MaintenanceTireRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ComponentsModule
  ]
})
export class MaintenanceTireModule { }
