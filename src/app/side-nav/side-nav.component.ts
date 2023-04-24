import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  pageShow: any;
  SideNavItem: any = []
  constructor(private loginService: AuthenticationServiceService) {

  }
  ngOnInit(): void {
    this.SideNavItem = [
      {
        showForAdmin: localStorage.getItem('staffFlag') === 'true',
        // showForAdmin: this.loginService.staffFlag,
        title: 'Manage Staff',
        link: 'staff',
      },

      {
        showForAdmin: this.loginService.universityFlag,
        title: 'Manage Universities',
        link: 'university',
      },

      {
        showForAdmin: this.loginService.studentFlag,
        title: 'Manage Students',
        link: 'student',
      },
      {
        showForAdmin: this.loginService.bookFlag,
        title: 'Manage Books',
        link: 'book',
      },
      {showForAdmin: localStorage.getItem('invoiceFlag') === 'true',
        // showForAdmin: this.loginService.invoiceFlag,
        title: 'Generate Invoice',
        link: 'invoice',
      },
      {
        showForAdmin: this.loginService.bookAllocationFlag,
        title: 'Book Allocation',
        link: 'bookAllocate',
      },
    ]
  }
}
