import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostPerKilometerRoutingModule } from './cost-per-kilometer-routing.module';
import { CostPerKilometerComponent } from './cost-per-kilometer.component';


@NgModule({
  declarations: [CostPerKilometerComponent],
  imports: [
    CommonModule,
    CostPerKilometerRoutingModule
  ]
})
export class CostPerKilometerModule { }
