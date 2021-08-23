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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { getDutchPaginatorIntl } from 'src/app/services/custom-paginator';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RegisterFormComponent } from './register-form/register-form.component';
import { TableResponsiveComponent } from './table-responsive/table-responsive.component';
import { InspectionTireFormComponent } from './inspection-tire-form/inspection-tire-form.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { RegisterPlantComponent } from './register-plant/register-plant.component';
import { TableErrorComponent } from './table-error/table-error.component';


@NgModule({
  declarations: [
    RegisterFormComponent,
    TableResponsiveComponent,
    InspectionTireFormComponent,
    TitleBarComponent,
    UploadFileComponent,
    RegisterPlantComponent,
    TableErrorComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    Ng2ImgMaxModule,
    MatTooltipModule
  ],
  exports: [
    RegisterFormComponent,
    TableResponsiveComponent,
    InspectionTireFormComponent,
    TitleBarComponent,
    UploadFileComponent,
    RegisterPlantComponent,
    TableErrorComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class ComponentsModule { }
