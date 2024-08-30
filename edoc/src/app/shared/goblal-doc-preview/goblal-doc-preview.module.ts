import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoblalDocPreviewComponent } from './goblal-doc-preview.component';
import { SharedModule } from '../shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [GoblalDocPreviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class GoblalDocPreviewModule { }
