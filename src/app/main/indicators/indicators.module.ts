import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';

import { MaterialModule } from 'src/app/material/material.module';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CostPerKilometerComponent } from './cost-per-kilometer/cost-per-kilometer.component';
import { RetreadIndexComponent } from './retread-index/retread-index.component';
import { RetreadabilityIndexComponent } from './retreadability-index/retreadability-index.component';


@NgModule({
  declarations: [
    IndicatorsComponent,
    CostPerKilometerComponent,
    RetreadIndexComponent,
    RetreadabilityIndexComponent
  ],
  imports: [
    CommonModule,
    IndicatorsRoutingModule,
    MatTabsModule,
    MaterialModule,
    GraphicsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IndicatorsModule { }
