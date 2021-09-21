import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapAnalysisRoutingModule } from './scrap-analysis-routing.module';
import { ScrapAnalysisComponent } from './scrap-analysis.component';
import { AnalysisByReasonComponent } from './analysis-by-reason/analysis-by-reason.component';
import { AnalysisByBrandComponent } from './analysis-by-brand/analysis-by-brand.component';


@NgModule({
  declarations: [ScrapAnalysisComponent, AnalysisByReasonComponent, AnalysisByBrandComponent],
  imports: [
    CommonModule,
    ScrapAnalysisRoutingModule
  ]
})
export class ScrapAnalysisModule { }
