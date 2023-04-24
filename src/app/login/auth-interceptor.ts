import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    decodedToken:any;
    userRole:any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
    this.decodedToken = jwtDecode(token);
    // console.log(this.decodedToken);
    this.userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'X-UserRole': this.userRole
        }
      });
    }
    return next.handle(request);
  }
}
