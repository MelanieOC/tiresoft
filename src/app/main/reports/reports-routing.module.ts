import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'curva-desgaste',
    loadChildren: () => import('./wear-curve/wear-curve.module').then(mod => mod.WearCurveModule),
    data: { permission: 'report.desgaste.neumatico.view' }
  },
  {
    path: 'remanenterodado',
    loadChildren: () => import('./rolled-remnant/rolled-remnant.module').then(mod => mod.RolledRemnantModule),
    data: { permission: 'report.remanente.rodado.view' }
  },
  {
    path: 'analisis-scrap',
    loadChildren: () => import('./scrap-analysis/scrap-analysis.module').then(mod => mod.ScrapAnalysisModule),
    data: { permission: 'report.analisis.scrap.view' }
  },
  {
    path: 'analisis-comparativo',
    loadChildren: () => import('./comparative-analysis/comparative-analysis.module').then(mod => mod.ComparativeAnalysisModule),
    data: { permission: 'report.scrap.marca.view' }
  },
  {
    path: 'generar',
    loadChildren: () => import('./generate/generate.module').then(mod => mod.GenerateModule),
    data: { permission: 'report.consolidado.neumaticos.view' }
  },
  {
    path: 'consolidado',
    loadChildren: () => import('./consolidated/consolidated.module').then(mod => mod.ConsolidatedModule),
    data: { permission: 'report.consolidado.neumaticos.view' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
