import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

import { RateComponent } from './rate/rate.component';
import { RemainderComponent } from './remainder/remainder.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { ListPlantsComponent } from './list-plants/list-plants.component';
import { ReportsComponent } from './reports/reports.component';
import { RegisterCriteriaComponent } from './criteria/register-criteria/register-criteria.component';
import { RegisterRateComponent } from './rate/register-rate/register-rate.component';
import { RegisterRemainderComponent } from './remainder/register-remainder/register-remainder.component';


@NgModule({
  declarations: [
    RateComponent,
    RemainderComponent,
    CriteriaComponent,
    ListPlantsComponent,
    ReportsComponent,
    RegisterCriteriaComponent,
    RegisterRateComponent,
    RegisterRemainderComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ]
})
export class ConfigurationModule { }
