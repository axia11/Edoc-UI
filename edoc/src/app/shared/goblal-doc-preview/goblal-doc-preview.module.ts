import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoblalDocPreviewComponent } from './goblal-doc-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'libs/material/src';



@NgModule({
  declarations: [GoblalDocPreviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GoblalDocPreviewModule { }
