import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectCustomerComponent } from './select-customer.component';

const routes: Routes = [
  {
    path: '',
    component: SelectCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectCustomerRoutingModule { }
