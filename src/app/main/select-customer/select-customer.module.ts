import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectCustomerRoutingModule } from './select-customer-routing.module';
import { SelectCustomerComponent } from './select-customer.component';

import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectCustomerComponent],
  imports: [
    CommonModule,
    SelectCustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SelectCustomerModule { }
