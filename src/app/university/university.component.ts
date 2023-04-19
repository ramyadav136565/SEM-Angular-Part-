// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// export interface university {
//   id: number;
//   name: string;
//   address: string;
//   action: number;
// }

// const universityDetails: university[] = [
//   {id: 1001, name: 'Solicon', address:'Mumbai', action: 1},
//   {id: 1002, name: 'DAVV', address: 'Indore', action: 2},
//   {id: 1003, name: 'HIT', address: 'Haldia', action: 1}
// ];

// @Component({
//   selector: 'app-university',
//   templateUrl: './university.component.html',
//   styleUrls: ['./university.component.css']
// })

// export class UniversityComponent{
  
//   panelOpenState1 = true;

//   // For Forms
//   universityForm = new FormGroup({
//     uniName: new FormControl('', Validators.required),
//     address: new FormControl('', Validators.required),
//   });

//   uniSubmitted(){
//     console.log(this.universityForm.value);
//   }

//   get uniName(): FormControl {
//     return this.universityForm.get('uniName') as FormControl;
//   }

//   get address(): FormControl {
//     return this.universityForm.get('address') as FormControl;
//   }
//   // For modal
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

//   // For table
//   displayedColumns: string[] = ['id', 'name', 'address', 'action'];
//   dataSource = universityDetails;

// }



import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import the MatDialogModule
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';
// import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';

declare var window:any;

export interface PeriodicElement {
  universityId: number;
  name: string;
  address: string;
}


@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  providers: [] // Add the MatDialogModule to the providers array
})

export class UniversityComponent implements OnInit{

constructor(private universityService:UniversitiyServiceService) {}
Name: any;
address: any;
title: any;
hideControl: any;
formName: any = true;


  UniversityList:any=[];
  showUniversityList(){
    this.universityService.showAllUniversities().subscribe(data=>{
      this.UniversityList=data;
    });
  }

  // getUniversityById(id: number) {
  //   this.hideControl = true;
  //   this.formName = false;
  //   this.universityService.getUniversityById(id).subscribe(data => {
  //     this.openModel();
  //     this.title = "Update University"
  //     this.updateForm = new FormGroup({
  //        universityId: new FormControl(data.universityId, Validators.required),
  //       Name: new FormControl(data.Name, Validators.required),
       
  //       address: new FormControl(data.address, Validators.required),
  //       // universityId: new FormControl(data.universityId, Validators.required),
  //       // term: new FormControl(data.term, Validators.required),
  //       // course: new FormControl(data.course, Validators.required),
  //       isDeleted: new FormControl(data.isDeleted, Validators.required)
  //     });
  //     console.log(data);
  //   });
  // }


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
            if (this.addForm.value.address == null || this.addForm.value.Name == null ) {
              window.alert("The University data provided appears to be invalid or null")
            }
            else {
              window.alert(error.error);
            }
            console.log(error);
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
            if (this.address == null ||  this.Name == null ) {
              window.alert("Please fill all details")
            }
            else {
              window.alert(error.error);
            }
            console.log(error);
          }
        });
    }
  }


  deleteUniversity(id: number): void {
    this.universityService.deleteUniversity(id).subscribe({
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
  panelOpenState1 = true;
  updateForm = new FormGroup({
    // studentId: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    // email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
    // term: new FormControl('', Validators.required),
    // course: new FormControl('', Validators.required),
    isDeleted: new FormControl('', Validators.required)
  });

  addForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    // universityId: new FormControl('', Validators.required),
   
  });
  
 
  uniSubmitted() {
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
  

  // ngOnInit(): void {
  //   this.showUniversityList();
  // }
  ngOnInit(): void {
    this.showUniversityList();
    this.title = "Add University"
  }
  // displayedColumns: string[] = ['stuId', 'name', 'address', 'email', 'course', 'term', 'isDeleted', 'action'];


  // For table
  displayedColumns: string[] = ['id', 'Name', 'address', 'action'];
}
