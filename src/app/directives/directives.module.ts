import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from './accordion.directive';
import { DragndropDirective } from './dragndrop.directive';



@NgModule({
  declarations: [AccordionDirective, DragndropDirective],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
