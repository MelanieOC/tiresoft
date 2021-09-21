import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurveByTiresComponent } from './curve-by-tires/curve-by-tires.component';
import { CurveByVehiclesComponent } from './curve-by-vehicles/curve-by-vehicles.component';
import { WearCurveComponent } from './wear-curve.component';

const routes: Routes = [
  {
    path: '',
    component: WearCurveComponent,
    children: [
      {
        path: 'vehiculos',
        component: CurveByVehiclesComponent,
        data: { permission: 'report.desgaste.vehiculo.view' }
      },
      {
        path: 'neumaticos',
        component: CurveByTiresComponent,
        data: { permission: 'report.desgaste.neumatico.view' }
      },
      {
        path: '', redirectTo: 'vehiculos', pathMatch: 'full',
        data: { permission: 'report.desgaste.vehiculo.view' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WearCurveRoutingModule { }
