import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersContactsComponent } from './customers-contacts/customers-contacts.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersPlantsComponent } from './customers-plants/customers-plants.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersListComponent
  },
  {
    path: 'create',
    component: CustomersFormComponent
  },
  {
    path: 'edit/:id',
    component: CustomersFormComponent
  },
  {
    path: 'plants/:id',
    component: CustomersPlantsComponent
  },
  {
    path: 'contacts/:id',
    component: CustomersContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
