import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatTabsModule } from '@angular/material/tabs';


import { ImportDataRoutingModule } from './import-data-routing.module';
import { ImportVehiclesComponent } from './import-vehicles/import-vehicles.component';
import { ImportTiresComponent } from './import-tires/import-tires.component';
import { ImportCriteriaComponent } from './import-criteria/import-criteria.component';
import { ImportDataComponent } from './import-data.component';


@NgModule({
  declarations: [
    ImportDataComponent,
    ImportVehiclesComponent,
    ImportTiresComponent,
    ImportCriteriaComponent
  ],
  imports: [
    CommonModule,
    ImportDataRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    MatTabsModule
  ]
})
export class ImportDataModule { }
