import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceVehicleComponent } from './maintenance-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceVehicleRoutingModule { }
