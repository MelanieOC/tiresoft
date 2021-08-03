import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostPerKilometerComponent } from './cost-per-kilometer.component';

const routes: Routes = [
  {
    path: '',
    component: CostPerKilometerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostPerKilometerRoutingModule { }
