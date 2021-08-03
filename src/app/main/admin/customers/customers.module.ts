import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { CustomersPlantsComponent } from './customers-plants/customers-plants.component';
import { CustomersContactsComponent } from './customers-contacts/customers-contacts.component';

@NgModule({
  declarations: [
    CustomersListComponent, 
    CustomersFormComponent, 
    CustomersPlantsComponent, 
    CustomersContactsComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    Ng2ImgMaxModule
  ]
})
export class CustomersModule { }
