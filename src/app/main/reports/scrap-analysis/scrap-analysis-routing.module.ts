import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrapAnalysisComponent } from './scrap-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: ScrapAnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapAnalysisRoutingModule { }
