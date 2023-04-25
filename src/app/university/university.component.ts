
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { DownloadServicesService } from '../services/DownloadServices/download-services.service';

export interface Status {
  value: boolean;
  viewValue: string;
}
export interface University {
  name: any;
  address: any;
}

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
})

export class UniversityComponent {
  showAlert = false;
  constructor(private universityService: UniversitiyServiceService, private route: ActivatedRoute,
    private downloadfiles:DownloadServicesService,
    private http:HttpClient
    ) { }

  dataSource = new MatTableDataSource<any>
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  title: any;
  hideControl: any;
  formName: any = true;
  isDeleted: any;
  loginFlag: any;
  UniversityList: any = [];
  showUniversityList() {
    this.universityService.showAllUniversities().subscribe(data => {
      this.UniversityList = data;
      this.dataSource = new MatTableDataSource(this.UniversityList);
      this.dataSource.paginator = this.paginator;

    });
  }

  getUniversityById(id: number) {
    this.hideControl = true;
    this.formName = false;
    this.universityService.getUniversityById(id).subscribe(data => {
      this.openModel();
      this.title = "Update University"
      this.updateForm = new FormGroup({
        universityId: new FormControl(data.universityId, Validators.required),
        name: new FormControl(data.name, Validators.required),
        address: new FormControl(data.address, Validators.required),
        isDeleted: new FormControl(data.isDeleted, Validators.required)
      });
    });
  }

  AddUpdateUniversity() {
    if (this.title == "Add University") {
      this.hideControl = false;
      this.universityService.addUniversity(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("University added SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
    else {
      this.formName = false;
      this.universityService.updateUniversity(this.updateForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("University updated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
  }

  deleteUniversity(id: number): void {
    if (window.confirm("Are you sure you want to delete this university ?")) {
      this.universityService.deleteUniversity(id).subscribe({
        next: (response: ArrayBuffer) => {
          const message = new TextDecoder().decode(response);
          window.alert(message);
          location.reload();
        },
        error: (error: any) => {
        }
      });
    }
  }
  downloadFile() {
    this.http.get(this.downloadfiles.universityurl, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Universitydata.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  panelOpenState1 = true;

  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
    isDeleted: new FormControl('', Validators.required)
  });

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  uniSubmitted() {
  }

  // For modal
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
    this.showUniversityList();
    this.title = "Add University"
    this.route.queryParams.subscribe((params: any) => {
      if (params['alert'] === 'success') {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    });
    this.loginFlag = localStorage.getItem('loginFlag') === 'true';
  }

  get validName(): FormControl {
    if (this.title == "Add University") {
      return this.addForm.get('name') as FormControl;
    } else {
      return this.updateForm.get('name') as FormControl;
    }
  }
  get validAddress(): FormControl {
    if (this.title == "Add University") {
      return this.addForm.get('address') as FormControl;
    } else {
      return this.updateForm.get('address') as FormControl;
    }
  }

  status: Status[] = [
    { value: true, viewValue: 'Disabled' },
    { value: false, viewValue: 'Enabled' },
  ];

  // For table
  displayedColumns: string[] = ['id', 'name', 'address', 'isActive', 'action'];
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}
