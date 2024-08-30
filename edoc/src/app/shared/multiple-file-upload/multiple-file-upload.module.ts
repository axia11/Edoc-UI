
import { NgModule, Injector } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MultipleFileUploadComponent } from './Multiplefileupload/multiple-file-upload.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        MultipleFileUploadComponent,
    ],
    exports: [
        MultipleFileUploadComponent,
    
    ],
    entryComponents: [
        MultipleFileUploadComponent,
    ]
})
export class MultiplefileuploadModule {

    constructor(private injector: Injector) {
        // const fileUploadElement = createCustomElement(FileUploadComponent, { injector });
        // customElements.define('file-upload', fileUploadElement);
    }

    ngDoBootstrap() {}
}
