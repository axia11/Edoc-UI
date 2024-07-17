
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectDdnClearDirective } from './select-ddn-clear.directive';
import { SelectDdnComponent } from './select-ddn.component';
import { SelectDdnInputComponent } from './select-ddn-inp.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    SelectDdnComponent,
    SelectDdnInputComponent,
    SelectDdnClearDirective
  ],
  exports: [
    SelectDdnComponent,
    SelectDdnInputComponent,
    SelectDdnClearDirective
  ]
})
export class SelectDdnModule { }
