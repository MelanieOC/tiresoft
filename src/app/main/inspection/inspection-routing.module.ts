import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { InspectionReportsComponent } from './inspection-reports/inspection-reports.component';

const routes: Routes = [
  {
    path: 'list',
    component: InspectionReportsComponent
  },
  {
    path: 'create',
    component: InspectionFormComponent
  },
  {
    path: 'edit/:id',
    component: InspectionFormComponent
  },
  { path: '',   redirectTo: 'list', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
