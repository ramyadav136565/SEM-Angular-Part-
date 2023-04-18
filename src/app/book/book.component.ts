import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// For table
export interface book {
  name: string;
  author: string;
  price: number;
  course: string;
  action: number;
}

const bookDetails: book[] = [
  {name: 'Hydrogen', author: 'Hydra', price: 100, course: 'BTech', action:1},
  {name: 'Hydrogen', author: 'Hydrogen', price: 250, course: 'BTech', action:1},
];

// For dropdown
interface Course {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent {
  // For Form
  bookForm = new FormGroup({
    bName: new FormControl('', Validators.required),
    bAuthor: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    course: new FormControl('', Validators.required)
  });

  bookSubmitted(){
    console.log(this.bookForm.value);
  }

  get bName(): FormControl {
    return this.bookForm.get('bName') as FormControl;
  }

  get bAuthor(): FormControl {
    return this.bookForm.get('bAuthor') as FormControl;
  }

  get price(): FormControl {
    return this.bookForm.get('price') as FormControl;
  }

  get course(): FormControl {
    return this.bookForm.get('course') as FormControl;
  }

  // For Modal
  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } 
  }

  courses: Course[] = [
    {value: 'BTech', viewValue: 'BTech'},
    {value: 'BCA', viewValue: 'BCA'},
    {value: 'BA', viewValue: 'BA'},
  ];

  // Table
  displayedColumns: string[] = ['name', 'author', 'price', 'course', 'action'];
  dataSource = bookDetails;
}
