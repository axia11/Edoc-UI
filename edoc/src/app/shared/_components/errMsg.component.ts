import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  template: `
   <mat-toolbar [color]="data.toolbarColor ?  data.toolbarColor : 'primary'">Error Message!</mat-toolbar>
    <div mat-dialog-content>
      <div style="padding-left: 10px; color: red; font-size: 1.15em;overflow-wrap: break-word;" [innerHtml]="data.message"></div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="cancel" [mat-dialog-close]="false">Close</button>
    </div>
`
})
export class ErrMsgComponent implements OnInit {
  toolbarColor = 'primary'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    const dialogs = this.dialog.openDialogs.filter(item => {
      return item.componentInstance instanceof ErrMsgComponent;
    });
    setTimeout(() => {
      if (dialogs.length > 1) {
        dialogs[1].close();
      }
    }, 0);
  }

}
