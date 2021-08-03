import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetreadIndexRoutingModule } from './retread-index-routing.module';
import { RetreadIndexComponent } from './retread-index.component';


@NgModule({
  declarations: [RetreadIndexComponent],
  imports: [
    CommonModule,
    RetreadIndexRoutingModule
  ]
})
export class RetreadIndexModule { }
