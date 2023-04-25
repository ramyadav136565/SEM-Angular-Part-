import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DownloadServicesService } from '../services/DownloadServices/download-services.service';
import { StudentServiceService } from '../services/StudentServices/student-service.service';
import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';

export interface Status {
  value: boolean;
  viewValue: string;
}

export interface University {
  value: number;
  viewValue: string;

}

export interface Term {
  value: number;
  viewValue: string;
}

export interface Course {
  value: string;
  viewValue: string;
}

export interface Student {
  fullName: any;
  address: any;
  email: any;
  universityId: any;
  term: any;
  course: any;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent {
  constructor(private studentService: StudentServiceService, 
    private universityService: UniversitiyServiceService ,
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

  StudentList: any = [];
  UniversityList: any = [];

  showUniversityList() {
    this.universityService.showAllUniversities().subscribe(data => {
      this.UniversityList = data;
      for (let i = 0; i < this.UniversityList.length; i++) {
        this.universities.push({
          value: this.UniversityList[i].universityId,
          viewValue: this.UniversityList[i].name
        });
      }

    });
  }

  ShowAllStudents() {
    this.studentService.showAllStudents().subscribe(data => {
      this.StudentList = data;
      this.dataSource = new MatTableDataSource(this.StudentList);
      this.dataSource.paginator = this.paginator;

    });
  }


  GetStudentById(id: number) {
    this.hideControl = true;
    this.formName = false;
    this.studentService.getStudentById(id).subscribe(data => {
      this.openModel();
      this.title = "Update Student"
      this.updateForm = new FormGroup({
        studentId: new FormControl(data.studentId, Validators.required),
        fullName: new FormControl(data.fullName, Validators.required),
        email: new FormControl(data.email, [Validators.required, Validators.email]),
        address: new FormControl(data.address, Validators.required),
        universityId: new FormControl(data.universityId, Validators.required),
        term: new FormControl(data.term, Validators.required),
        course: new FormControl(data.course, Validators.required),
        isDeleted: new FormControl(data.isDeleted, Validators.required)
      });
    });
  }

  AddUpdateStudent() {
    if (this.title == "Add Student") {
      this.hideControl = false;
      this.studentService.addStudent(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Student added SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
    else {
      this.formName = false;
      this.studentService.updateStudent(this.updateForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Student updated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
  }

  deleteStudent(id: number): void {
    if (window.confirm("Are you sure you want to delete this student?")) {
      this.studentService.deleteStudent(id).subscribe({
        next: (response: ArrayBuffer) => {
          var message = new TextDecoder().decode(response);
          window.alert(message);
          location.reload();
        },
        error: (error: any) => {

        }
      });

    }
  }

  downloadFile() {
    this.http.get(this.downloadfiles.studenturl, { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Studentdata.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
  // For panel
  panelOpenState1 = true;

  // For form
  updateForm = new FormGroup({
    studentId: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
    term: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    isDeleted: new FormControl('', Validators.required)
  });

  addForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
    term: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
  });

  stuSubmitted() {
  }

  get validEmail(): FormControl {
    if (this.title == "Add Student") {
      return this.addForm.get('email') as FormControl;
    } else {
      return this.updateForm.get('email') as FormControl;
    }
  }

  get validName(): FormControl {
    if (this.title == "Add Student") {
      return this.addForm.get('fullName') as FormControl;
    } else {
      return this.updateForm.get('fullName') as FormControl;
    }
  }

  get validAddress(): FormControl {
    if (this.title == "Add Student") {
      return this.addForm.get('address') as FormControl;
    } else {
      return this.updateForm.get('address') as FormControl;
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
    this.showUniversityList();
    this.ShowAllStudents();
    this.title = "Add Student"
  }

  status: Status[] = [
    { value: true, viewValue: 'Inctive' },
    { value: false, viewValue: 'Active' },
  ];

  universities: University[] = [];


  terms: Term[] = [
    { value: 1, viewValue: '1st sem' },
    { value: 2, viewValue: '2nd sem' },
    { value: 3, viewValue: '3rd sem' },
    { value: 4, viewValue: '4th sem' },
    { value: 5, viewValue: '5th sem' },
    { value: 6, viewValue: '6th sem' },
    { value: 7, viewValue: '7th sem' },
    { value: 8, viewValue: '8th sem' }
  ];

  courses: Course[] = [
    { value: 'B.tech', viewValue: 'B.tech' },
    { value: 'BCA', viewValue: 'BCA' },
    { value: 'BA', viewValue: 'BA' },
  ];

  displayedColumns: string[] = ['stuId', 'name', 'address', 'university', 'email', 'course', 'term', 'isDeleted', 'action'];
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;

  }

}


