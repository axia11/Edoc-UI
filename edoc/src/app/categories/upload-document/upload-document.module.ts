import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDocumentComponent } from './upload-document.component';
import { DocTitleComponent } from './doc-title/doc-title.component';
import { MaterialModule } from 'libs/material/src';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'src/app/shared/ver1-files-upload/file-upload.module';
import { DocCompanionComponent } from './doc-Companion/doc-companion.component';
import { RevisionHistoryComponent } from './revision-history/revision-history.component';


@NgModule({
  declarations: [UploadDocumentComponent, DocTitleComponent, DocCompanionComponent, RevisionHistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    SharedModule,
    FileUploadModule,
    RouterModule.forChild([
      {
        path: '', component: UploadDocumentComponent,
        data: {
          breadcrumb: {
            showbreadcrumb: false, // make it true to display the breadCrumb
            label: 'PLM',
            skip: true,
            info: { myData: { icon: 'home', iconType: 'material' } }
          }
        },
        children: [
          {
            path: 'title', component: DocTitleComponent,
            data: {
              breadcrumb: {
                label: 'title',
              }
            },
          },
        ]
      },

    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UploadDocumentModule { }
