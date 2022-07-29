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
      headers: req.headers.set('apikey', 'zFeorRiKICr5mdmVwSn4zP0J2irPak6i'),
    });
    return next.handle(modifiedReq);
  }
}
