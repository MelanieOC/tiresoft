import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { InspectionComponent } from './inspection.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionComponent
  },
  {
    path: 'create',
    component: InspectionFormComponent
  },
  {
    path: 'edit/:id',
    component: InspectionFormComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
