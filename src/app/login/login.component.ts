import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {LoginService} from './loginServices'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoggedIn = false;
  constructor() { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    inputEmail: new FormControl('', [Validators.required, Validators.email]),
    inputPassword : new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  loginSubmit() {
    console.log(this.loginForm)
    this.isLoggedIn = true;
  }

  get inputEmail(): FormControl {
    return this.loginForm.get('inputEmail') as FormControl;
  }

  get inputPassword(): FormControl {
    return this.loginForm.get('inputPassword') as FormControl;
  }
}
