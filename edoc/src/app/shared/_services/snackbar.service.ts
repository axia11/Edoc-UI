import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  open(msg, color, duration?) {
    this.snackBar.open(msg, '', {
      duration: duration || 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [color, 'sb-custom']
    });
  }

  dismiss() {
    this.snackBar.dismiss();
  }
}
