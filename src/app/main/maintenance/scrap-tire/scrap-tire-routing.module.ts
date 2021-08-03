import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrapTireComponent } from './scrap-tire.component';

const routes: Routes = [
  {
    path: '',
    component: ScrapTireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapTireRoutingModule { }
