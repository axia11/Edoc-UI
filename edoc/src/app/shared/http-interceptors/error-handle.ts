import { environment } from 'src/environments/environment';
import { ErrMsgComponent } from './../_components/errMsg.component';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class HandleErrorService {

  errorMsg = new Subject();

  constructor(
    private dialog: MatDialog,
    private httpObj: HttpClient,
  ) { }

  getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }

  errorHandle(error: HttpErrorResponse) {
    // Function to safely extract error information
    const extractErrorInfo = (error: HttpErrorResponse) => {
      return {
        status: error?.status,
        statusText: error?.statusText,
        message: error?.message,
        url: error?.url,
        error: {
          message: error?.error?.message || error?.error?.error || error?.error || error.message,
        }
      };
    };

    // Log relevant error details
    try {
      console.log('Error handler triggered with error:', extractErrorInfo(error));
    } catch (e) {
      console.error('Failed to log error:', e);
    }

    if (error === null || error === undefined) {
      console.error('Error object is null or undefined.');
      this.errorMsg.next('An Unexpected Error Occurred.');
      return throwError('An unexpected error occurred.');
    }

    if (error.status === 401) {
      this.dialog.open(ErrMsgComponent, {
        width: '500px',
        data: {
          message: error.statusText
        }
      });
      setTimeout(() => {
        if (localStorage.userId) {
          this.logoutUser().subscribe(res => {
            if (res) {
              this.redirectAfterLogout();
            }
          }, err => {
            if (err.status === 400) {
              this.redirectAfterLogout();
            }
          });
        }
        else {
          this.redirectAfterLogout();
        }
      }, 1000);
    } else if (error.status === 0) {
      console.error('An error occurred:', error);
      this.errorMsg.next('An Unexpected Error Occurred.');
      return throwError(error);
    } else {
      console.error('An error occurred:', error.error?.message || error.message);
      this.errorMsg.next(error.error?.message || error.error?.error || error.message);
      return throwError(error);
    }
  }




  logoutUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.httpObj.post(`${environment.apiUrl}/account/logout/${localStorage.getItem('userId')}`, userId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  redirectAfterLogout() {
    this.dialog.closeAll();
    if (window.location.host.includes('localhost')) {
      window.location.href = `http://${window.location.host}`;
    }
    else {
      window.location.href = `https://${window.location.host}`;
    }
    // window.localStorage.clear();
    localStorage.removeItem('firstName');
    localStorage.removeItem('clientName');
    localStorage.removeItem('token');
    localStorage.removeItem('userCategoryId');
  }
}
