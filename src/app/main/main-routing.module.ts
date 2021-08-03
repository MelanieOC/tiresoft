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
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./configuration/configuration.module').then(mod => mod.ConfigurationModule),
        //canActivateChild: [OpeningGuard]
      },
      {
        path: 'indicadores',
        loadChildren: () => import('./indicators/indicators.module').then(mod => mod.IndicatorsModule),
        //canActivateChild: [OpeningGuard]
      },
      {
        path: 'reportes',
        loadChildren: () => import('./reports/reports.module').then(mod => mod.ReportsModule),
        //canActivateChild: [OpeningGuard]
      },
      {
        path: 'mantenimiento',
        loadChildren: () => import('./maintenance/maintenance.module').then(mod => mod.MaintenanceModule),
        //canActivateChild: [OpeningGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
