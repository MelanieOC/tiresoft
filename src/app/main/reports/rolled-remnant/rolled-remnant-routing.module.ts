import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolledRemnantComponent } from './rolled-remnant.component';

const routes: Routes = [
  {
    path: '',
    component: RolledRemnantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolledRemnantRoutingModule { }
