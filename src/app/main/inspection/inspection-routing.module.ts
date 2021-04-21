import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspectionComponent } from './inspection.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./inspection-form/inspection-form.module').then(mod => mod.InspectionFormModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./inspection-form/inspection-form.module').then(mod => mod.InspectionFormModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
