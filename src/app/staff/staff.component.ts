import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service';
import { StaffServiceService } from '../services/StaffServices/staff-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DownloadServicesService } from '../services/DownloadServices/download-services.service';

export interface Status {
  value: boolean;
  viewValue: string;
}
export interface Role {
  value: any;
  viewValue: string;
}


export interface User {

  fullName: any;
  email: any;
  roleId: any;

}
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})


export class StaffComponent implements OnInit {
  showAlert = false;

  constructor(private StaffServiceService: StaffServiceService,
    private loginService: AuthenticationServiceService,
    private route: ActivatedRoute,
    private downloadfiles:DownloadServicesService,
    private http:HttpClient
    ) { }
  dataSource = new MatTableDataSource<any>

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  title: any;
  hideControl: any;
  formName: any = true;
  UniversityName: any;
  loginFlag: any;

  UserList: any = [];
  ShowAllUsers() {
    this.StaffServiceService.showAllUsers().subscribe(data => {
      this.UserList = data;
      this.dataSource = new MatTableDataSource(this.UserList);
      this.dataSource.paginator = this.paginator;
    });
  }


  GetUserById(id: number) {
    this.hideControl = true;
    this.formName = false;
    this.StaffServiceService.getUsersById(id).subscribe(data => {
      this.openModel();
      this.title = "Update Staff"
      this.updateForm = new FormGroup({
        userId: new FormControl(data.userId, Validators.required),
        fullName: new FormControl(data.fullName, Validators.required),
        email: new FormControl(data.email, [Validators.required, Validators.email]),
        password: new FormControl(data.password, Validators.required),
        roleId: new FormControl(data.roleId, Validators.required),
        isActive: new FormControl(data.isActive, Validators.required)
      });
    });
  }

  AddUpdateUser() {
    if (this.title == "Add Staff") {
      this.hideControl = false;
      this.StaffServiceService.addUsers(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Staff added SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
    else {
      this.formName = false;
      this.StaffServiceService.updateUsers(this.updateForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Staff updated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
  }

  deleteUsers(id: number): void {
    if (window.confirm("Are you sure you want to delete this staff ?")) {
      this.StaffServiceService.deleteUser(id).subscribe({
        next: (response: ArrayBuffer) => {
          var message = new TextDecoder().decode(response);
          window.alert(message);
          this.showAlert = false;
          location.reload();
        },
        error: (error: any) => {
        }
      });

    }
  }
  downloadFile() {
    this.http.get(this.downloadfiles.staffurl, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Staffdata.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  // // For panel
  panelOpenState1 = true;

  // For form
  updateForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    roleId: new FormControl('', Validators.required),
    isActive: new FormControl('', Validators.required)
  });

  addForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  stuSubmitted() {

  }

  get validEmail(): FormControl {
    if (this.title == "Add Staff") {
      return this.addForm.get('email') as FormControl;
    } else {
      return this.updateForm.get('email') as FormControl;
    }
  }

  get validName(): FormControl {
    if (this.title == "Add Staff") {
      return this.addForm.get('fullName') as FormControl;
    } else {
      return this.updateForm.get('fullName') as FormControl;
    }
  }

  // For Modal
  openModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
      location.reload();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params['alert'] === 'success') {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    });

    this.loginFlag = localStorage.getItem('loginFlag') === 'true';
    this.ShowAllUsers();

    this.title = "Add Staff"
  }

  status: Status[] = [
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'Inctive' }
  ];
  roles: Role[] = [
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Staff' }
  ];

  displayedColumns: string[] = ['Id', 'name', 'email', 'isActive', 'action'];
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}


