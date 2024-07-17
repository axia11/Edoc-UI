import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'libs/material/src';
import { GenDataMatrixComponent } from './gen-data-matrix/gen-data-matrix.component';



@NgModule({
  declarations: [GenDataMatrixComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenDataMatrixComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataMatrixModule { }
