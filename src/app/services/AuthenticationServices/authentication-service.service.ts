import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  url = "http://localhost:63832/"

  constructor(private Http: HttpClient) { }

  loginFlag: any ;
  staffFlag: any ;
  universityFlag: any = true;
  invoiceFlag: any;
  studentFlag: any = true;
  bookFlag: any = true;
  bookAllocationFlag: any = true;
  showLogoutButton: any = false;
  userLogin(data: any): Observable<any> {
    const encodedEmail = encodeURIComponent(data.userIdOrEmail);
    return this.Http.post<any>(this.url + `ValidateUser?userIdOrEmail=${encodedEmail}&password=${data.password}`, data);
  }

  logout(): Observable<any> {
    return this.Http.delete<any>(this.url + 'Logout')
  }

  userRegister(data: any): Observable<any> {
    const encodedEmail = encodeURIComponent(data.userIdOrEmail);
    return this.Http.post<any>(this.url + `RegisterUser?userIdOrEmail=${encodedEmail}&password=${data.password}`, data);
  }
}
