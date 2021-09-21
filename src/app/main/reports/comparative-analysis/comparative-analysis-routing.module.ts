import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparativeAnalysisComponent } from './comparative-analysis.component';
import { ComparativeByBrandComponent } from './comparative-by-brand/comparative-by-brand.component';
import { ComparativeByConfiComponent } from './comparative-by-confi/comparative-by-confi.component';

const routes: Routes = [
  {
    path: '',
    component: ComparativeAnalysisComponent,
    children: [
      {
        path: 'configuracion',
        component: ComparativeByConfiComponent,
        data: { permission: 'report.comparativo.configuracion.view' }
      },
      {
        path: 'marcas',
        component: ComparativeByBrandComponent,
        data: { permission: 'report.comparativo.marca.view' }
      },
      {
        path: '', redirectTo: 'configuracion', pathMatch: 'full',
        data: { permission: 'report.comparativo.configuracion.view' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparativeAnalysisRoutingModule { }
