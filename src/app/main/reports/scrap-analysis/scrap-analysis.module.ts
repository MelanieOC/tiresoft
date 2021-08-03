import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapAnalysisRoutingModule } from './scrap-analysis-routing.module';
import { ScrapAnalysisComponent } from './scrap-analysis.component';


@NgModule({
  declarations: [ScrapAnalysisComponent],
  imports: [
    CommonModule,
    ScrapAnalysisRoutingModule
  ]
})
export class ScrapAnalysisModule { }
