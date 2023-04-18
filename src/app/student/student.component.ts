import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//For table
export interface students {
  stuId: number;
  name: string;
  address: string;
  email: string;
  university: string;
  term: number;
  course: string;
  isDeleted: string;
  action: number;
}

// Form fields
interface University {
  value: number;
  viewValue: string;
}

interface Term {
  value: number;
  viewValue: string;
}

interface Course {
  value: string;
  viewValue: string;
}

//For table
const studentDetails: students[] = [
  {stuId: 1, name: 'Rameshwar', address:'Indore', email:'ram@gamil.com', university:'Silicon', term:2, course:'BTech', isDeleted: 'Yes', action: 1},
  {stuId: 2, name: 'Piyush', address:'Odisha', email:'piyush@gamil.com', university:'ITDAV', term:8, course:'BA',  isDeleted: 'No', action: 1},
  {stuId: 3, name: 'Yogesh', address:'Lucknow', email:'harsh@gamil.com', university:'CV Raman', term:6, course:'BE',  isDeleted: 'No', action: 1},
];

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent{
  // For panel
  panelOpenState1 = true;
  
  // For form
  stuForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
    term: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
    course: new FormControl('', Validators.required),
  });

  stuSubmitted(){
    console.log(this.stuForm.value);
  }

  get name(): FormControl {
    return this.stuForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.stuForm.get('email') as FormControl;
  }

  get address(): FormControl {
    return this.stuForm.get('address') as FormControl;
  }

  get universityId(): FormControl {
    return this.stuForm.get('universityId') as FormControl;
  }

  get term(): FormControl {
    return this.stuForm.get('term') as FormControl;
  }

  get course(): FormControl {
    return this.stuForm.get('course') as FormControl;
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

  // For form fields
  terms: Term[] = [
    {value: 1, viewValue: '1st sem'},
    {value: 2, viewValue: '2nd sem'},
    {value: 3, viewValue: '3rd sem'},
    {value: 4, viewValue: '4th sem'},
    {value: 5, viewValue: '5th sem'},
    {value: 6, viewValue: '6th sem'},
    {value: 7, viewValue: '7th sem'},
    {value: 8, viewValue: '8th sem'},
    {value: 9, viewValue: '9th sem'},
    {value: 10, viewValue: '10th sem'},
    {value: 11, viewValue: '11th sem'},
    {value: 12, viewValue: '12th sem'},
  ];

  courses: Course[] = [
    {value: 'BTech', viewValue: 'BTech'},
    {value: 'BCA', viewValue: 'BCA'},
    {value: 'BA', viewValue: 'BA'},
  ];


  universities: University[] = [
    {value: 1001, viewValue: 'Solicon'},
    {value: 1002, viewValue: 'DAVV'},
    {value: 1003, viewValue: 'HIT'},
  ];

  // For table
  displayedColumns: string[] = ['stuId', 'name', 'address', 'email','university', 'course', 'term', 'isDeleted', 'action'];
  dataSource = studentDetails;
}
