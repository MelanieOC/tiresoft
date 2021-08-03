import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WearCurveComponent } from './wear-curve.component';

const routes: Routes = [
  {
    path: '',
    component: WearCurveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WearCurveRoutingModule { }
