import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatTabsModule } from '@angular/material/tabs';

import { ComparativeAnalysisRoutingModule } from './comparative-analysis-routing.module';
import { ComparativeAnalysisComponent } from './comparative-analysis.component';
import { ComparativeByConfiComponent } from './comparative-by-confi/comparative-by-confi.component';
import { ComparativeByBrandComponent } from './comparative-by-brand/comparative-by-brand.component';


@NgModule({
  declarations: [
    ComparativeAnalysisComponent, 
    ComparativeByConfiComponent, 
    ComparativeByBrandComponent
  ],
  imports: [
    CommonModule,
    ComparativeAnalysisRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    MatTabsModule
  ]
})
export class ComparativeAnalysisModule { }
