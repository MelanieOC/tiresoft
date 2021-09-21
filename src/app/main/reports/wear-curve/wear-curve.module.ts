import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatTabsModule } from '@angular/material/tabs';

import { WearCurveRoutingModule } from './wear-curve-routing.module';
import { WearCurveComponent } from './wear-curve.component';
import { CurveByTiresComponent } from './curve-by-tires/curve-by-tires.component';
import { CurveByVehiclesComponent } from './curve-by-vehicles/curve-by-vehicles.component';


@NgModule({
  declarations: [WearCurveComponent, CurveByTiresComponent, CurveByVehiclesComponent],
  imports: [
    CommonModule,
    WearCurveRoutingModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxMatSelectSearchModule,
    MatTabsModule
  ]
})
export class WearCurveModule { }
