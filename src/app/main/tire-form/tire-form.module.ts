import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TireFormComponent } from './tire-form.component';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Ng2ImgMaxModule } from 'ng2-img-max';

@NgModule({
  declarations: [TireFormComponent],
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
    MatBottomSheetModule,
    Ng2ImgMaxModule
  ],
  exports: [
    TireFormComponent
  ]
})
export class TireFormModule { }
