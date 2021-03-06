import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { GraphicsModule } from 'src/app/graphics/graphics.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    Ng2ImgMaxModule,
    GraphicsModule
  ]
})
export class HomeModule { }
