import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookAllocationServiceService } from '../services/BookAllocationServices/book-allocation-service.service';
import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';
import { StudentServiceService } from '../services/StudentServices/student-service.service';
import { BookServiceService } from '../services/BookServices/book-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// For dropdowns
interface Book {
  value: string;
  viewValue: string;
}

interface Student {
  value: number;
  viewValue: string;
}

interface University {
  value: number;
  viewValue: string;
}

// For table
export interface BookAllocation {
  studentId: number;
  bookId: number;
  universityId: number;
  action: number;
}

@Component({
  selector: 'app-book-allocation',
  templateUrl: './book-allocation.component.html',
  styleUrls: ['./book-allocation.component.css'],

})

export class BookAllocationComponent {
 selectedUniversity: number = 0;
  constructor(
    private bookAllocationService: BookAllocationServiceService,
    private universityService: UniversitiyServiceService,
    private studentService: StudentServiceService,
    private bookService: BookServiceService,
    private http: HttpClient
  ) { }


  dataSource = new MatTableDataSource<any>
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  universities$: Observable<any[]> = new Observable<any[]>();

  updateForm = new FormGroup({
    id: new FormControl('', Validators.required),
    bookId: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
  });

  addForm = new FormGroup({
    bookId: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
  });
  UniversityList: any = [];
  StudentList: any = [];
  BookList: any = [];
  BookAllocationList: any = [];
  universities: University[] = [];
  students: Student[] = [];
  books: Book[] = [];
  title: any;
  hideControl: any = true;
  formName: any = true;
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

  showStudentList() {
    this.studentService.showAllStudents().subscribe(data => {
      this.StudentList = data;

      for (let i = 0; i < this.StudentList.length; i++) {
        this.students.push({
          value: this.StudentList[i].studentId,
          viewValue: this.StudentList[i].fullName
        });
      }
    });
  }

  showBookList() {
    this.bookService.showAllBooks().subscribe(data => {
      this.BookList = data;

      for (let i = 0; i < this.BookList.length; i++) {
        this.books.push({
          value: this.BookList[i].bookId,
          viewValue: this.BookList[i].bookName
        });
      }
    });
  }
  ShowAllocatedBooks() {
    this.bookAllocationService.showAllocatedBooks().subscribe(data => {
      this.BookAllocationList = data;
      this.dataSource = new MatTableDataSource(this.BookAllocationList);
      this.dataSource.paginator = this.paginator;
    });
  }

  GetBookAllocationById(id: number) {
    this.hideControl = true;
    this.formName = false;
    this.bookAllocationService.getBookAllocationById(id).subscribe(data => {
      this.openModel();
      this.title = "Update BookAllocation"
      this.updateForm = new FormGroup({
        studentId: new FormControl(data.studentId, Validators.required),
        universityId: new FormControl(data.universityId, Validators.required),
        id: new FormControl(data.id, Validators.required),
        bookId: new FormControl(data.bookId, Validators.required),

      });
    });
  }

  AddUpdateBookAllocation() {
    if (this.title == "Allocate Books") {
      this.hideControl = false;
      this.bookAllocationService.allocateBookToStudent(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Book Allocate SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
    else {
      this.formName = false;
      this.bookAllocationService.updateBookAllocation(this.updateForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Book Allocaton  updated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
          }
        });
    }
  }

  deleteBookAllocation(id: number): void {
    if (window.confirm("Are you sure you want to delete this Book ?")) {
      this.bookAllocationService.deleteBookAllocation(id).subscribe({
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

  ngOnInit(): void {
    this.ShowAllocatedBooks();
    this.showUniversityList();
     this.showStudentList();
    this.showBookList();
    this.title = "Allocate Books"
  }

  bAllotSubmitted() {}

  // // For table
  displayedColumns: string[] = ['uName', 'sName', 'bName', 'action'];

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
    }
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}
