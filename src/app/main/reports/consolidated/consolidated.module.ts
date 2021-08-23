import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxPaginationModule } from 'ngx-pagination';
import { GraphicsModule } from 'src/app/graphics/graphics.module';

import { ConsolidatedRoutingModule } from './consolidated-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RecommendationComponent } from './recommendation/recommendation.component';


@NgModule({
  declarations: [ListComponent, FormComponent, RecommendationComponent],
  imports: [
    CommonModule,
    ConsolidatedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    Ng2ImgMaxModule,
    GraphicsModule,
    NgxPaginationModule
  ]
})
export class ConsolidatedModule { }
