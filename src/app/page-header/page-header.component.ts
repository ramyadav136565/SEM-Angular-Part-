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
      }
    });
  }

  LogOut() {
    this.authService.logout();
    localStorage.removeItem("token");
    this.router.navigate(['/login'])

      // Remove variables from Local Storage
      localStorage.removeItem('loginFlag');
      localStorage.removeItem('staffFlag');
      localStorage.removeItem('universityFlag');
      localStorage.removeItem('studentFlag');
      localStorage.removeItem('bookFlag');
      localStorage.removeItem('invoiceFlag');
      localStorage.removeItem('bookAllocationFlag');
    }

  ngOnInit() { }
}
