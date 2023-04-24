// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { NavigationStart, Router } from '@angular/router';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerForm = new FormGroup({

//     inputEmail: new FormControl('', [Validators.required, Validators.email]),

//     inputPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),

//   });

//   registerSubmit() {
//     console.log(this.registerForm)
//     // this.isLoggedIn = true;
//   }

//   get inputEmail(): FormControl {
//     return this.registerForm.get('inputEmail') as FormControl;
//   }

//   get inputPassword(): FormControl {
//     return this.registerForm.get('inputPassword') as FormControl;
//   }


//   showHead: boolean = false;
//   ngOnInit() {
//   }

//   constructor(private router: Router) {
//     router.events.forEach((event) => {
//       if (event instanceof NavigationStart) {
//         if (event['url'] == ('/login' || '/')) {
//           this.showHead = false;
//         } else {
//           this.showHead = true;
//         }
//       }
//     });
//   }
// }
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
    // this.hideControl = false;
    this.loginService.userRegister(this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login']);
          window.alert("Password generated SuccessFully");
          // location.reload();
        },
        error: (error: any) => {
          window.alert(error.error);
          location.reload();
          console.log(error);
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

  registerSubmit() {
    console.log(this.registerForm)

  }

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
