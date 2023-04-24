import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookServiceService } from '../services/BookServices/book-service.service';

export interface Status {
  value: boolean;
  viewValue: string;
}
export interface Course {
  value: string;
  viewValue: string;
}

export interface book {
  // bookId:any;
  bookName: any;
  bookAuthor: any;
  bookPrice:any;
  course: any;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent {
  constructor(private bookService : BookServiceService) { }
  title: any;
  hideControl: any;
  formName: any = true;

  dataSource = new MatTableDataSource<any>
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  BookList: any = [];
  showBookList() {
    this.bookService.showAllBooks().subscribe(data => {
      this.BookList = data;
      this.dataSource = new MatTableDataSource(this.BookList);
      this.dataSource.paginator = this.paginator;
      
    });
  }

  getBookById(id: number) {
    this.hideControl = true;
    this.formName = false;
    this.bookService.getBookById(id).subscribe(data => {
      this.openModel();
      this.title = "Update Book"
      this.updateForm = new FormGroup({
        bookId: new FormControl(data.bookId, Validators.required),
        bookName: new FormControl(data.bookName, Validators.required),
        bookAuthor: new FormControl(data.bookAuthor, Validators.required),
        bookPrice: new FormControl(data.bookPrice,  [Validators.required,Validators.min(1)]),
        course: new FormControl(data.course, Validators.required),
        isDeleted: new FormControl(data.isDeleted, Validators.required)
      });
      console.log(data);
    });
  }

  AddUpdateBook() {
    if (this.title == "Add Book") {
      this.hideControl = false;
      this.bookService.addBook(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Book added SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
            console.log(error);
          }
        });
    }
    else {
      this.formName = false;
      this.bookService.updateBook(this.updateForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("Book updated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
            console.log(error);
          }
        });
    }
  }

  deleteBook(id: number): void {
    if (window.confirm("Are you sure you want to delete this book ?")) {
      this.bookService.deleteBook(id).subscribe({
        next: (response: ArrayBuffer) => {
          const message = new TextDecoder().decode(response);
          window.alert(message);
          console.log(message);
          location.reload();
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  panelOpenState1 = true;

  updateForm = new FormGroup({
    bookName: new FormControl('', Validators.required),
    bookAuthor: new FormControl('', Validators.required),
    bookId: new FormControl('', Validators.required),
    bookPrice: new FormControl('',  [Validators.required, Validators.min(1)]),//,Validators.min(1)  Validators.pattern(/^\d+$/)
    course: new FormControl('', Validators.required),
    isDeleted: new FormControl('', Validators.required)
  });

  addForm = new FormGroup({
    bookName: new FormControl('', Validators.required),
    bookAuthor: new FormControl('', Validators.required),
    bookPrice: new FormControl('',  [Validators.required, Validators.min(1)]),
    course: new FormControl('', Validators.required)
  });


  bookSubmitted() {
    console.log(this.updateForm.value);
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
    this.showBookList();
    this.title = "Add Book"
  }

  get validName(): FormControl {
    if (this.title == "Add Book") {
      return this.addForm.get('bookName') as FormControl;
    } else {
      return this.updateForm.get('bookName') as FormControl;
    }
  }
  get validAuthor(): FormControl {
    if (this.title == "Add Book") {
      return this.addForm.get('bookAuthor') as FormControl;
    } else {
      return this.updateForm.get('bookAuthor') as FormControl;
    }
  }

  get validPrice(): FormControl {
    if (this.title == "Add Book") {
      return this.addForm.get('bookPrice') as FormControl;
    } else {
      return this.updateForm.get('bookPrice') as FormControl;
    }
  }

  get validCourse(): FormControl {
    if (this.title == "Add Book") {
      return this.addForm.get('course') as FormControl;
    } else {
      return this.updateForm.get('course') as FormControl;
    }
  }

  status: Status[] = [
    { value: true, viewValue: 'Unavailable' },
    { value: false, viewValue: 'Available' },
  ];

  courses: Course[] = [
        {value: 'B.tech', viewValue: 'B.tech'},
        {value: 'BCA', viewValue: 'BCA'},
        {value: 'BA', viewValue: 'BA'},
      ];
    
  // For table
  displayedColumns: string[] = ['id', 'bookName', 'bookAthor','bookPrice','course','action'];
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
}
}