import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriteriaComponent } from './criteria/criteria.component';
import { ListPlantsComponent } from './list-plants/list-plants.component';
import { RateComponent } from './rate/rate.component';
import { RemainderComponent } from './remainder/remainder.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'listacriterioaceptacion',
    component: CriteriaComponent,
    data: { permission: 'admin.criterio.list' }
  },
  {
    path: 'tipocambio',
    component: RateComponent,
    data: { permission: 'admin.cambio.list' }
  },
  {
    path: 'remanenteaplicacion',
    component: RemainderComponent,
    data: { permission: 'admin.aplicacion.list' }
  },
  {
    path: 'reportes',
    component: ReportsComponent,
    data: { permission: 'admin.reportes.list' }
  },
  {
    path: 'importar',
    loadChildren: () => import('./import-data/import-data.module').then(mod => mod.ImportDataModule),
    data: { permission: 'admin.importar.upload' }
  },
  {
    path: 'listado_plantas',
    component: ListPlantsComponent,
    data: { permission: 'admin.planta.list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
