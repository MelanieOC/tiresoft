import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesFormComponent } from './roles-form/roles-form.component';

@NgModule({
  declarations: [
    RolesListComponent,
    RolesFormComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    ComponentsModule
  ]
})
export class RolesModule { }
