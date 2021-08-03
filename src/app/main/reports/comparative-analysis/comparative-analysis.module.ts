import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComparativeAnalysisRoutingModule } from './comparative-analysis-routing.module';
import { ComparativeAnalysisComponent } from './comparative-analysis.component';


@NgModule({
  declarations: [ComparativeAnalysisComponent],
  imports: [
    CommonModule,
    ComparativeAnalysisRoutingModule
  ]
})
export class ComparativeAnalysisModule { }
