import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { InspectionFormRoutingModule } from './inspection-form-routing.module';
import { InspectionFormComponent } from './inspection-form.component';
import { TireFormModule } from '../../tire-form/tire-form.module';
import { TableResponsiveModule } from '../../table-responsive/table-responsive.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    InspectionFormComponent
  ],
  imports: [
    CommonModule,
    InspectionFormRoutingModule,
    MaterialModule,
    MatDialogModule,
    LazyLoadImageModule,
    MatButtonToggleModule,
    TireFormModule,
    MatStepperModule,
    MatBottomSheetModule,
    TableResponsiveModule,
    ComponentsModule
  ]
})
export class InspectionFormModule { }
