import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeableTableComponent } from './resizeable-table.component';
import { ResizebleTableDirective } from './resizeble-table.directive';



@NgModule({
  declarations: [ResizeableTableComponent, ResizebleTableDirective],
  imports: [
    CommonModule
  ]
})
export class ResizeableTableModule { }
