// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// //For table
// export interface students {
//   stuId: number;
//   name: string;
//   address: string;
//   email: string;
//   university: string;
//   term: number;
//   course: string;
//   isDeleted: string;
//   action: number;
// }

// // Form fields
// interface University {
//   value: number;
//   viewValue: string;
// }

// interface Term {
//   value: number;
//   viewValue: string;
// }

// interface Course {
//   value: string;
//   viewValue: string;
// }

// //For table
// const studentDetails: students[] = [
//   {stuId: 1, name: 'Rameshwar', address:'Indore', email:'ram@gamil.com', university:'Silicon', term:2, course:'BTech', isDeleted: 'Yes', action: 1},
//   {stuId: 2, name: 'Piyush', address:'Odisha', email:'piyush@gamil.com', university:'ITDAV', term:8, course:'BA',  isDeleted: 'No', action: 1},
//   {stuId: 3, name: 'Yogesh', address:'Lucknow', email:'harsh@gamil.com', university:'CV Raman', term:6, course:'BE',  isDeleted: 'No', action: 1},
// ];

// @Component({
//   selector: 'app-student',
//   templateUrl: './student.component.html',
//   styleUrls: ['./student.component.css']
// })

// export class StudentComponent{
//   // For panel
//   panelOpenState1 = true;

//   // For form
//   stuForm = new FormGroup({
//     name: new FormControl('', Validators.required),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     address: new FormControl('', Validators.required),
//     universityId: new FormControl('', Validators.required),
//     term: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
//     course: new FormControl('', Validators.required),
//   });

//   stuSubmitted(){
//     console.log(this.stuForm.value);
//   }

//   get name(): FormControl {
//     return this.stuForm.get('name') as FormControl;
//   }

//   get email(): FormControl {
//     return this.stuForm.get('email') as FormControl;
//   }

//   get address(): FormControl {
//     return this.stuForm.get('address') as FormControl;
//   }

//   get universityId(): FormControl {
//     return this.stuForm.get('universityId') as FormControl;
//   }

//   get term(): FormControl {
//     return this.stuForm.get('term') as FormControl;
//   }

//   get course(): FormControl {
//     return this.stuForm.get('course') as FormControl;
//   }


//   // For Modal
//   openModel() {
//     const modelDiv = document.getElementById('myModal');
//     if(modelDiv!= null) {
//       modelDiv.style.display = 'block';
//     } 
//   }

//   CloseModel() {
//     const modelDiv = document.getElementById('myModal');
//     if(modelDiv!= null) {
//       modelDiv.style.display = 'none';
//     } 
//   }

//   // For form fields
//   terms: Term[] = [
//     {value: 1, viewValue: '1st sem'},
//     {value: 2, viewValue: '2nd sem'},
//     {value: 3, viewValue: '3rd sem'},
//     {value: 4, viewValue: '4th sem'},
//     {value: 5, viewValue: '5th sem'},
//     {value: 6, viewValue: '6th sem'},
//     {value: 7, viewValue: '7th sem'},
//     {value: 8, viewValue: '8th sem'},
//     {value: 9, viewValue: '9th sem'},
//     {value: 10, viewValue: '10th sem'},
//     {value: 11, viewValue: '11th sem'},
//     {value: 12, viewValue: '12th sem'},
//   ];

//   courses: Course[] = [
//     {value: 'BTech', viewValue: 'BTech'},
//     {value: 'BCA', viewValue: 'BCA'},
//     {value: 'BA', viewValue: 'BA'},
//   ];


//   universities: University[] = [
//     {value: 1001, viewValue: 'Solicon'},
//     {value: 1002, viewValue: 'DAVV'},
//     {value: 1003, viewValue: 'HIT'},
//   ];

//   // For table
//   displayedColumns: string[] = ['stuId', 'name', 'address', 'email','university', 'course', 'term', 'isDeleted', 'action'];
//   dataSource = studentDetails;
// }


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from '../services/StudentServices/student-service.service';

interface Status {
  value: boolean;
  viewValue: string;
}
// interface universityNames{
//   value:string;
//   viewValue: number;
// }

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

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent {
  constructor(private studentService: StudentServiceService,) { }

  fullName: any;
  address: any;
  email: any;
  universityId: any;
  term: any;
  course: any;
  title: any;
  studentId: any;
  hideControl: any;
  formName: any = true;

  StudentList: any = [];
  ShowAllStudents() {
    this.studentService.showAllStudents().subscribe(data => {
      this.StudentList = data;
      console.log(data);
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
      console.log(data);
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
            // if (this.addForm.value.address == null || this.addForm.value.course == "" || this.addForm.value.email == null || this.addForm.value.fullName == null || this.addForm.value.term == null || this.addForm.value.universityId == null) {
            //   window.alert("The student data provided appears to be invalid or null")
            // }
            // else {
              window.alert(error.error);
            // }
            console.log(error);
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
            // if (this.address == null || this.course == "" || this.email == null || this.fullName == null || this.term == null || this.universityId == null) {
            //   window.alert("Please fill all details")
            // }
            // else {
              window.alert(error.error);
            // }
            console.log(error);
          }
        });
    }
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe({
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

  // stuSubmitted() {
  //   console.log(this.updateForm.value);
  // }
  stuSubmitted() {
    console.log(this.updateForm.value);
  }
  get validEmail(): FormControl {
      
    if (this.title == "Add Student"){
      return this.addForm.get('email') as FormControl;
      }else
      {
        return this.updateForm.get('email') as FormControl;
      }


    

  }
  get validName(): FormControl {
     
    if (this.title == "Add Student"){
    return this.addForm.get('fullName') as FormControl;
    }else
    {
      return this.updateForm.get('fullName') as FormControl;
    }
  }
  get validAddress(): FormControl {
    if (this.title == "Add Student"){
      return this.addForm.get('address') as FormControl;
      }else
      {
        return this.updateForm.get('address') as FormControl;
      }

   
    
     }
    

    


  // get email(): FormControl {

  //   return this.stuForm.get('email') as FormControl;

  // }




  // get address(): FormControl {

  //   return this.stuForm.get('address') as FormControl;

  // }




  // get universityId(): FormControl {

  //   return this.stuForm.get('universityId') as FormControl;

  // }




  // get term(): FormControl {

  //   return this.stuForm.get('term') as FormControl;

  // }




  // get course(): FormControl {

  //   return this.stuForm.get('course') as FormControl;

  // }

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
    this.ShowAllStudents();
    this.title = "Add Student"
  }
  status: Status[] = [
    { value: true, viewValue: 'Inctive' },
    { value: false, viewValue: 'Active' },

  ];

  universities: University[] = [
    { value: 1001, viewValue: 'Solicon' },
    { value: 1002, viewValue: 'DAVV' },
    { value: 1003, viewValue: 'HIT' }

  ];

  terms: Term[] = [
    { value: 1, viewValue: '1st sem' },
    { value: 2, viewValue: '2nd sem' },
    { value: 3, viewValue: '3rd sem' },
    { value: 4, viewValue: '4th sem' },
    { value: 5, viewValue: '5th sem' },
    { value: 6, viewValue: '6th sem' },
    { value: 7, viewValue: '7th sem' },
    { value: 8, viewValue: '8th sem' },
    // {value: 9, viewValue: '9th sem'},
    // {value: 10, viewValue: '10th sem'},
    // {value: 11, viewValue: '11th sem'},
    // {value: 12, viewValue: '12th sem'},
  ];

  courses: Course[] = [
    { value: 'B.Tech', viewValue: 'B.Tech' },
    { value: 'BCA', viewValue: 'BCA' },
    { value: 'BA', viewValue: 'BA' },
  ];
  // universityNames:universityName[] = {
   
  
  // };

  // For table
  displayedColumns: string[] = ['stuId', 'name', 'address', 'university','email', 'course', 'term', 'isDeleted', 'action'];
}


