import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  templateUrl: './confirm-delete.component.html'

})
export class ConfirmDeleteComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  delRecord() {
    this.dialogRef.close();
    this.data.fn();
  }
}
