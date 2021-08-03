import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(mod => mod.RolesModule)
    //data: { permission: 'campaign.create' }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./user-management/user-management.module').then(mod => mod.UserManagementModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./customers/customers.module').then(mod => mod.CustomersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
