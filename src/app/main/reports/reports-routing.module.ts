import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'curva-desgaste',
    loadChildren: () => import('./wear-curve/wear-curve.module').then(mod => mod.WearCurveModule)
    //data: { permission: 'campaign.create' }
  },
  {
    path: 'remanenterodado',
    loadChildren: () => import('./rolled-remnant/rolled-remnant.module').then(mod => mod.RolledRemnantModule)
  },
  {
    path: 'analisis-scrap',
    loadChildren: () => import('./scrap-analysis/scrap-analysis.module').then(mod => mod.ScrapAnalysisModule)
  },
  {
    path: 'analisis-comparativo',
    loadChildren: () => import('./comparative-analysis/comparative-analysis.module').then(mod => mod.ComparativeAnalysisModule)
  },
  {
    path: 'generar',
    loadChildren: () => import('./generate/generate.module').then(mod => mod.GenerateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
