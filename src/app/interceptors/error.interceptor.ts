import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { DatabaseService } from '../services/database.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private dbs: DatabaseService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(error => {
        if ([401, 403].indexOf(error.status) !== -1) {
          this.dbs.customerSelect.next(null)
          this.auth.logout();

        }
        return throwError(error);
      })
    );
  }
}
