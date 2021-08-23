import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./select-customer/select-customer.module').then(mod => mod.SelectCustomerModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
      },
      {
        path: 'inspecciones',
        loadChildren: () => import('./inspection/inspection.module').then(mod => mod.InspectionModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./configuration/configuration.module').then(mod => mod.ConfigurationModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'indicadores',
        loadChildren: () => import('./indicators/indicators.module').then(mod => mod.IndicatorsModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'reportes',
        loadChildren: () => import('./reports/reports.module').then(mod => mod.ReportsModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'mantenimiento',
        loadChildren: () => import('./maintenance/maintenance.module').then(mod => mod.MaintenanceModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
        canActivateChild: [AuthGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
