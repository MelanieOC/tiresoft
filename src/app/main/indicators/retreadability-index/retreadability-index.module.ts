import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetreadabilityIndexRoutingModule } from './retreadability-index-routing.module';
import { RetreadabilityIndexComponent } from './retreadability-index.component';


@NgModule({
  declarations: [RetreadabilityIndexComponent],
  imports: [
    CommonModule,
    RetreadabilityIndexRoutingModule
  ]
})
export class RetreadabilityIndexModule { }
