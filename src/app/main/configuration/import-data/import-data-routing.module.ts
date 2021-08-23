import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportCriteriaComponent } from './import-criteria/import-criteria.component';
import { ImportDataComponent } from './import-data.component';
import { ImportTiresComponent } from './import-tires/import-tires.component';
import { ImportVehiclesComponent } from './import-vehicles/import-vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: ImportDataComponent,
    children: [
      {
        path: 'vehiculos',
        component: ImportVehiclesComponent,
        data: { permission: 'admin.importar.upload' }
      },
      {
        path: 'neumaticos',
        component: ImportTiresComponent,
        data: { permission: 'admin.importar.upload' }
      },
      {
        path: 'criterios',
        component: ImportCriteriaComponent,
        data: { permission: 'admin.importar.upload' }
      },
      { path: '', redirectTo: 'vehiculos', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportDataRoutingModule { }
