import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service';


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Output() menuClicked = new EventEmitter<boolean>();
  showHead: any = false;
  currentRoute: string;
  constructor(private router: Router, private authService: AuthenticationServiceService) {

    this.currentRoute = "";




    this.router.events.forEach((event) => {




      if (event instanceof NavigationStart) {




        this.currentRoute = event.url;




        if (this.currentRoute == ('/')) {




          this.showHead = false;




        } else if (this.currentRoute == ('/login')) {




          this.showHead = false;





        }

        else if (this.currentRoute == ('/login/register')) {

          this.showHead = false;

        } else {




          this.showHead = true;




        }







      }







      if (event instanceof NavigationEnd) {




        this.currentRoute = event.url;




        if (this.currentRoute == ('/')) {




          this.showHead = false;




        } else if (this.currentRoute == ('/login')) {




          this.showHead = false;




        }

        else if (this.currentRoute == ('/login/register')) {

          this.showHead = false;

        } else {




          this.showHead = true;




        }




      }







      if (event instanceof NavigationError) {




        if (event.url == ('/' || '/login')) {




          this.showHead = false;




        }

        // else (this.currentRoute==('/login/register')){

        //     this.showHead=false;

        // }







      }




    });






  }


  //       router.events.forEach((event) => {
  //         if (event instanceof NavigationStart) {
  //           if (event['url'] == ('/login' || '/')) {
  //             this.showHead = false;
  //           } else {

  //             this.showHead = true;
  //           }
  //       });
  // }


  LogOut() {
    this.authService.logout();
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

}

// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Router, NavigationStart } from '@angular/router';
// import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service';


// @Component({
//   selector: 'app-page-header',
//   templateUrl: './page-header.component.html',
//   styleUrls: ['./page-header.component.css']
// })
// export class PageHeaderComponent implements OnInit {
//   @Output() menuClicked = new EventEmitter<boolean>();
//   loginFlag:any = false;
//   showLogoutButton:any;

//   constructor(private router: Router,private authService:AuthenticationServiceService) {

//     router.events.forEach((event) => {

//       if (event instanceof NavigationStart) {
//           this.showLogoutButton = this.authService.showLogoutButton;
//       }

//     });

//   }


//   LogOut() {
//     this.authService.showLogoutButton=false;
//     this.authService.logout();
//     localStorage.removeItem("token");
//     this.router.navigate(['/']);
//   }

//   ngOnInit() {
//   }

// }

