import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = req.clone({
      // headers: req.headers.set('apikey', 'EfBa8t4YiqOP9X53ThG107yRHFjIa54X'),
      headers: req.headers.set('apikey', 'laUONzTdVRPdbDB4gkragwdZn4FhlhcU'),
    });
    return next.handle(modifiedReq);
  }
}
