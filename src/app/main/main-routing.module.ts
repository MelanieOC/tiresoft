import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./select-customer/select-customer.module').then(mod => mod.SelectCustomerModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
      },
      {
        path: 'inspecciones',
        loadChildren: () => import('./inspection/inspection.module').then(mod => mod.InspectionModule),
        //canActivateChild: [OpeningGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
