import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetreadabilityIndexComponent } from './retreadability-index.component';

const routes: Routes = [
  {
    path: '',
    component: RetreadabilityIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetreadabilityIndexRoutingModule { }
