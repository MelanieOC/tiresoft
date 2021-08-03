import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'vehiculos',
    loadChildren: () => import('./maintenance-vehicle/maintenance-vehicle.module').then(mod => mod.MaintenanceVehicleModule)
    //data: { permission: 'campaign.create' }
  },
  {
    path: 'neumaticos',
    loadChildren: () => import('./maintenance-tire/maintenance-tire.module').then(mod => mod.MaintenanceTireModule)
  },
  {
    path: 'scrap-neumaticos',
    loadChildren: () => import('./scrap-tire/scrap-tire.module').then(mod => mod.ScrapTireModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
