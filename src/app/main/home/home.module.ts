import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { GraphicsModule } from 'src/app/graphics/graphics.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    Ng2ImgMaxModule,
    GraphicsModule,
    NgxEchartsModule.forRoot({ echarts })
  ]
})
export class HomeModule { }
