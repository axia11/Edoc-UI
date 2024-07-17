import { ErrMsgComponent } from './../_components/errMsg.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HandleErrorService } from './error-handle';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  jwt = new JwtHelperService();
  constructor(
    private Injector: Injector,
    private dialog: MatDialog
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hes = this.Injector.get(HandleErrorService);
    return next.handle(req).pipe(
      map(res => {
        // if (!environmentLucy.production && res instanceof HttpResponse) {
        //   console.log(`### ${req.urlWithParams} ######################################`);
        //   console.log(`req.body: ${req.body}, method: ${req.method},`);
        //   console.log(res.body);
        //   console.log(`length: ${res.body.recordset ? res.body.recordset.length : 'NA'},ok: ${res.ok}, status: ${res.status},statusText: ${res.statusText},type: ${res.type},`);
        //   if(res.body.errorCode === '500') {
        //     this.dialog.open(ErrMsgComponent, {
        //       width: '500px',
        //       data: {
        //         message: 'Unauthorised'
        //       }
        //     });
        //     window.location.href = environment.baseUrl;
        //     // window.localStorage.clear();
        //     localStorage.removeItem('firstName');
        //     localStorage.removeItem('clientName');
        //     localStorage.removeItem('token');
        //   }
        // }
        return res;
      }),
      catchError(err => hes.errorHandle(err))
    );
  }
}
