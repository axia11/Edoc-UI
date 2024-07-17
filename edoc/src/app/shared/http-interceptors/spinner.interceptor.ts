import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from '../_services/data.services';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  count = 0;

  constructor(
    private ds: DataService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.count++;
    if (this.count >= 1) {
      this.ds.apiLoads.next(true);
    }
    // console.log('Count Added: ', this.count, req.url);
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.ds.apiLoads.next(false);
        }
        // console.log('Count Substacted: ', this.count, req.url);
      })
    );

  }
}
