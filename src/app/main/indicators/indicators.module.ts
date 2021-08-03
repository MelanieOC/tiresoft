import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [IndicatorsComponent],
  imports: [
    CommonModule,
    IndicatorsRoutingModule,
    MatTabsModule
  ]
})
export class IndicatorsModule { }
