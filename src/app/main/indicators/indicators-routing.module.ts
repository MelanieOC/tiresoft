import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorsComponent } from './indicators.component';

const routes: Routes = [
  {
    path: '',
    component: IndicatorsComponent,
   /* children: [
      {
        path: 'costoporkilometro',
        loadChildren: () => import('./cost-per-kilometer/cost-per-kilometer.module').then(m => m.CostPerKilometerModule),
        data: { permission: 'indic.costo.list' }
      },
      {
        path: 'indicereencauche',
        loadChildren: () => import('./retread-index/retread-index.module').then(m => m.RetreadIndexModule),
        data: { permission: 'indic.reencauche.list' }
      },
      {
        path: 'indicereencauchabilidad',
        loadChildren: () => import('./retreadability-index/retreadability-index.module').then(m => m.RetreadabilityIndexModule),
        data: { permission: 'indic.reencauchabilidad.list' }
      },
      {
        path: '',
        redirectTo: 'costoporkilometro',
        pathMatch: 'full',
        data: { permission: 'indic.costo.list' }
      }
    ],*/
    data: { all: 'indic' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorsRoutingModule { }
