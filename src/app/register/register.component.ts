import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegisterUser() {
    this.loginService.userRegister(this.registerForm.value)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
          window.alert("Password generated SuccessFully");
        },
        error: (error: any) => {
          window.alert(error.error);
          location.reload();
        }
      });
  }



  registerForm = new FormGroup({
    userIdOrEmail: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.com$/i)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/)
    ]),

  });
  registerSubmit() { }

  get inputEmail(): FormControl {
    return this.registerForm.get('userIdOrEmail') as FormControl;
  }

  get inputPassword(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  showHead: boolean = false;
  ngOnInit() {
  }

  constructor(private loginService: AuthenticationServiceService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == ('/login/register' || '/')) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
