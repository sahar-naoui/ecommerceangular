import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token')?.replace(/"/g, '');

    const authReq = token ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Session expirée',
            text: 'Veuillez vous reconnecter.',
            confirmButtonText: 'Se connecter'
          }).then(() => {
            sessionStorage.removeItem('token');
            this.router.navigate(['/login']);
          });
        }
        return throwError(() => error);
      })
    );
  }
}
