import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WearCurveRoutingModule } from './wear-curve-routing.module';
import { WearCurveComponent } from './wear-curve.component';


@NgModule({
  declarations: [WearCurveComponent],
  imports: [
    CommonModule,
    WearCurveRoutingModule
  ]
})
export class WearCurveModule { }
