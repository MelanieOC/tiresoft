import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceTireComponent } from './maintenance-tire.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceTireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceTireRoutingModule { }
