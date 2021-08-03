import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparativeAnalysisComponent } from './comparative-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: ComparativeAnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparativeAnalysisRoutingModule { }
