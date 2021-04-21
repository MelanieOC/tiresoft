import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { RegisterFormComponent } from './register-form/register-form.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { DetailsFormComponent } from './details-form/details-form.component';



@NgModule({
  declarations: [
    RegisterFormComponent, 
    TableInfoComponent, DetailsFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    LazyLoadImageModule,
    NgxMatSelectSearchModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatBottomSheetModule,
  ],
  exports:[
    RegisterFormComponent,  
    TableInfoComponent
  ]
})
export class ComponentsModule { }
