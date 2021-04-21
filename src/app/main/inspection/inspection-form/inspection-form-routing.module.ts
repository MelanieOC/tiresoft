import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspectionFormComponent } from './inspection-form.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionFormRoutingModule { }
