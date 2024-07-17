import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ver1DataTableComponent } from './ver1-data-table.component';
import { Ver1DataTablePaginatorComponent } from './ver1-data-table-paginator.component';
import { MaterialModule } from 'libs/material/src';
// import { SharedModule } from '../shared.module';
import { MdePopoverModule } from '@material-extended/mde';
import { ChartsModule } from 'ng2-charts';
import { ConfirmDeleteComponent } from './confirm-delete.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MdePopoverModule,
    ChartsModule
   
  ],
  declarations: [
    Ver1DataTableComponent,
    Ver1DataTablePaginatorComponent,
    ConfirmDeleteComponent
  ],
  entryComponents: [
    ConfirmDeleteComponent
  ],
  exports: [
    Ver1DataTableComponent,
    Ver1DataTablePaginatorComponent,
    ConfirmDeleteComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataTableModule { }
