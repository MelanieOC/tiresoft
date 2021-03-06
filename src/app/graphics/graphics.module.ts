import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import { MaterialModule } from 'src/app/material/material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { CurveChartComponent } from './curve-chart/curve-chart.component';

@NgModule({
  declarations: [BarChartComponent, PieChartComponent, CurveChartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  exports: [
    BarChartComponent, 
    PieChartComponent
  ]
})
export class GraphicsModule { }
