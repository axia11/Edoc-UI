import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from 'libs/material/src';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Ver3DataTableModule } from './ver3-data-table/ver3-data-table/ver3-data-table/ver3-data-table.module';
import { Ver4DataTableModule } from './ver4-data-table/ver4-data-table.module';
import { MdePopoverModule } from '@material-extended/mde';
import { CommonService } from './_services/common.service';
import { InlineEditDatatableModule } from './inline-edit-datatable/inline-edit-datatable.module';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDdnModule } from './select-dropdown/select-ddn.module';
import { SnackbarService } from './_services/snackbar.service';
import { DataService } from './_services/data.services';
import { TestComponentComponent } from './test-component/test-component.component';
import { DataMatrixModule } from './data-matrix/data-matrix.module';
import { DataTableModule } from './ver1-data-table/ver1-data-table.module';
import { AccessControlDirective } from './_directives/access-control.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MultiplefileuploadModule } from './multiple-file-upload/multiple-file-upload.module';
import { GoblalDocPreviewModule } from './goblal-doc-preview/goblal-doc-preview.module';
import { ResizeableTableModule } from './resizeable-table/resizeable-table.module';

@NgModule({
  declarations: [TestComponentComponent,AccessControlDirective],
  imports: [
    CommonModule,
    Ver3DataTableModule,
    Ver4DataTableModule,
    GoblalDocPreviewModule,
    MaterialModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    InlineEditDatatableModule,
    SelectDdnModule,
    FormsModule,
    ReactiveFormsModule,
    DataMatrixModule,
    ResizeableTableModule,
    DataTableModule
  ],
  exports: [
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDdnModule,
    MdePopoverModule,
    Ver3DataTableModule,
    MultiplefileuploadModule,
    GoblalDocPreviewModule,
    Ver4DataTableModule,
    InlineEditDatatableModule,
    DataTableModule,
    DataMatrixModule,
    ResizeableTableModule,
    AccessControlDirective
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    CommonService,
    DataService,
    SnackbarService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
