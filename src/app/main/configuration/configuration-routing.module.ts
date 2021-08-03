import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriteriaComponent } from './criteria/criteria.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { ListPlantsComponent } from './list-plants/list-plants.component';
import { RateComponent } from './rate/rate.component';
import { RemainderComponent } from './remainder/remainder.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'listacriterioaceptacion',
    component: CriteriaComponent
    //data: { permission: 'campaign.create' }
  },
  {
    path: 'tipocambio',
    component: RateComponent
  },
  {
    path: 'remanenteaplicacion',
    component: RemainderComponent
  },
  {
    path: 'reportes',
    component: ReportsComponent
  },
  {
    path: 'importar',
    loadChildren: () => import('./import-data/import-data.module').then(mod => mod.ImportDataModule)
  },
  {
    path: 'listado_plantas',
    component: ListPlantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
