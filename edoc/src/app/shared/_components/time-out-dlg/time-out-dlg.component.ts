import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserLogoutService } from '../../_services/user-logout.service';

@Component({
  selector: 'blunet-time-out-dlg',
  templateUrl: './time-out-dlg.component.html',
  styleUrls: ['./time-out-dlg.component.scss']
})
export class TimeOutDlgComponent implements OnInit {

  countLeft;
  interval;

  constructor(
    private apiService: UserLogoutService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TimeOutDlgComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.startCountDown(30);
    this.dialogRef.backdropClick().subscribe(data => data ? clearInterval(this.interval) : '');
  }

  // logOut() {
  //   this.apiService.logout();
  // }

  // startCountDown(seconds) {
  //   let counter = seconds;
  //   this.interval = setInterval(() => {
  //     this.countLeft = counter;
  //     counter--;
  //     if (counter < 0) {
  //       clearInterval(this.interval);
  //       this.apiService.logout();
  //     }
  //   }, 1000);
  // }

  stayLoggedIn() {
    clearInterval(this.interval);
    this.dialog.closeAll();
  }

}
