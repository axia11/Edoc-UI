import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MdePopoverModule } from '@material-extended/mde';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'libs/material/src';
import { Ver4DataTableComponent } from './ver4-data-table.component';



@NgModule({
  declarations: [Ver4DataTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MdePopoverModule,
    ChartsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    Ver4DataTableComponent,
    ChartsModule,
    FormsModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Ver4DataTableModule { }
