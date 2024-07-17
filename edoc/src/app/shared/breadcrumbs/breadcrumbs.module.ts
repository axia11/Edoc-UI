import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './breadcrumbs/breadcrumbs.component';
import { MaterialModule } from '@tenr/material';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    BreadCrumbComponent,
    RouterModule
  ]
})
export class BreadCrumbModule { }
