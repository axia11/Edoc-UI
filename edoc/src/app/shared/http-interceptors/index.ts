import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop-interceptor';
import { SpinnerInterceptor } from './spinner.interceptor';

export const httpInterceptorProviders = [
   { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },

  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
];
