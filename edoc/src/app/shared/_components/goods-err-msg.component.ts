import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  template: `
  <!-- <mat-toolbar class="mat-toolbar-for-error"color="primary" 
  style="height: 47px;padding-left: 23px">Error Message!</mat-toolbar>
  <div mat-dialog-content>
    <div style="padding-left: 15px;padding-right: 16px;color: red; font-size: 1em;word-break: break-all" [innerHtml]="data.message"></div>
  </div>
  <div mat-dialog-actions align="end">
    <button mat-raised-button color="cancel"  [mat-dialog-close]="false">{{data.errorBtnText}}</button>
  <button mat-raised-button color="cancel"  [mat-dialog-close]="true">{{data.successBtnText}}</button>


  </div> -->
`
})
export class GoodsErrMsgComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.dialog.openDialogs.filter(item => {
      return item.componentInstance instanceof GoodsErrMsgComponent;
    });
  }

}





