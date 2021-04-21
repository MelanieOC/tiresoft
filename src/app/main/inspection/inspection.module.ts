import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { InspectionComponent } from './inspection.component';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableResponsiveModule } from '../table-responsive/table-responsive.module';
import { InspectionListDialogComponent } from './inspection-list-dialog/inspection-list-dialog.component';


@NgModule({
  declarations: [InspectionComponent, InspectionListDialogComponent],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    LazyLoadImageModule,
    NgxMatSelectSearchModule,
    TableResponsiveModule
  ]
})
export class InspectionModule { }
