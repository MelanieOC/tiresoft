import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrapTireRoutingModule } from './scrap-tire-routing.module';
import { ScrapTireComponent } from './scrap-tire.component';


@NgModule({
  declarations: [ScrapTireComponent],
  imports: [
    CommonModule,
    ScrapTireRoutingModule
  ]
})
export class ScrapTireModule { }
