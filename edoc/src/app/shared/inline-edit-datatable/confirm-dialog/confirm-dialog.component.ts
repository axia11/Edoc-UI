import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.dialogData.title;
    this.message = data.dialogData.message;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
    this.data.fn();
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}