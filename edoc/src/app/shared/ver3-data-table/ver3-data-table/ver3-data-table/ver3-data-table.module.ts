import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MdePopoverModule } from '@material-extended/mde';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'libs/material/src';
import { Ver3DataTableComponent } from './ver3-data-table.component';



@NgModule({
  declarations: [Ver3DataTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MdePopoverModule,
    ChartsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    Ver3DataTableComponent,
    ChartsModule,
    FormsModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Ver3DataTableModule { }
