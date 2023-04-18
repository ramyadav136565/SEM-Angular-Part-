import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
export interface bookAllot {
  uName: string;
  sName: string;
  bName: string;
  action: number;
}

const bookAllotDetails: bookAllot[] = [
  {uName: 'Silicon', sName: 'Piyush', bName:'Wings of Fire', action: 1},
  {uName: 'ITDAV', sName: 'Ram', bName: 'Dot Net', action: 2},
  {uName: 'CV Raman', sName: 'Ashutosh', bName: 'Angular', action: 1}
];

@Component({
  selector: 'app-book-allocation',
  templateUrl: './book-allocation.component.html',
  styleUrls: ['./book-allocation.component.css']
})


export class BookAllocationComponent {
  bAllotForm = new FormGroup({
    bId: new FormControl('', Validators.required),
    sId: new FormControl('', Validators.required),
    uId: new FormControl('', Validators.required),
  });

  bAllotSubmitted(){
    console.log(this.bAllotForm.value);
  }

  get bId(): FormControl {
    return this.bAllotForm.get('bId') as FormControl;
  }

  get sId(): FormControl {
    return this.bAllotForm.get('sId') as FormControl;
  }

  get uId(): FormControl {
    return this.bAllotForm.get('uId') as FormControl;
  }
  // For table
  displayedColumns: string[] = ['uName', 'sName', 'bName', 'action'];
  dataSource = bookAllotDetails;

  // For table
  books: Book[] = [
    {value: '2001', viewValue: 'Engineering Physics'},
    {value: '2002', viewValue: 'Advanced Engineering Mathematics'},
    {value: '2004', viewValue: 'Engineering Drawing'},
    {value: '2005', viewValue: 'Data Structure'},
    {value: '2006', viewValue: 'Network Security'},
    {value: '2007', viewValue: 'Compiler Design'},
  ];

  students: Student[] = [
    {value: 101, viewValue: 'Rohit Sharma'},
    {value: 104, viewValue: 'Rohit Yadav'},
    {value: 103, viewValue: 'pradeep Yadav'},
  ];


  universities: University[] = [
    {value: 1001, viewValue: 'Solicon'},
    {value: 1002, viewValue: 'DAVV'},
    {value: 1003, viewValue: 'HIT'},
  ];

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
}
