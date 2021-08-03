import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetreadIndexComponent } from './retread-index.component';

const routes: Routes = [
  {
    path: '',
    component: RetreadIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetreadIndexRoutingModule { }
