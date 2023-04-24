import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service'
import {  HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  token: any;
  decodedToken: any;
  userRole: any;
  invoiceFlag :any;
  staffFlag:any;


  constructor(private loginService: AuthenticationServiceService, private router: Router) { }
  loginFlag: any;
  request: HttpRequest<any> = new HttpRequest<any>('GET', '/');
  Login() {
    this.loginService.userLogin(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.loginService.showLogoutButton = true;
          localStorage.setItem('token', response.token);
          this.token = localStorage.getItem('token');
          if (this.token) {
            this.decodedToken = jwtDecode(this.token);
            this.userRole = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            this.loginService.showLogoutButton = true;
            if (this.userRole == "Admin") {
              this.loginService.loginFlag = true;
              this.loginService.staffFlag = true;
              this.loginService.invoiceFlag = true;
              localStorage.setItem('loginFlag', this.loginService.loginFlag.toString());
              localStorage.setItem('staffFlag',this.loginService.staffFlag.toString());
              localStorage.setItem('invoiceFlag',this.loginService.invoiceFlag.toString());
              this.router.navigate(['/staff']);
              // { queryParams: { alert: 'success' } });
            }
            else {
              this.loginService.loginFlag = false;
              this.loginService.staffFlag = false;
              this.loginService.invoiceFlag = false;
              localStorage.setItem('loginFlag', this.loginService.loginFlag.toString());
              localStorage.setItem('staffFlag',this.loginService.staffFlag.toString());
              localStorage.setItem('invoiceFlag',this.loginService.invoiceFlag.toString());
              this.router.navigate(['/university']);
              // ], { queryParams: { alert: 'success' } });
            }
            localStorage.setItem('token', response.token);
            window.alert("Login SuccessFully");
          }
        },
        error: (error: any) => {
          window.alert(error.error);
        }
      });

  }
  

  ngOnInit(): void {
    
  }
 
  loginForm = new FormGroup({
    userIdOrEmail: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.com$/i)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/)
    ]),
  });

  get inputEmail(): FormControl {
    return this.loginForm.get('userIdOrEmail') as FormControl;
  }

  get inputPassword(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
