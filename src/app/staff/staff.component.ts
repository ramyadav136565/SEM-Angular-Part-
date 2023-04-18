import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// For table
export interface staff {
  name: string;
  staffId: number;
  email: string;
  position: string;
  status: string;
  action: number;
}

const staffDetails: staff[] = [
  {staffId: 1, name: 'Yogesh', email:'qwe@gmail.com', position:'Staff', status:'Active', action: 1},
  {staffId: 2, name: 'Aman', email:'abc@gmail.com',  position:'Staff', status:'Inactive', action:2}
];

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent {
  // For panel
  panelOpenState1 = false;

  // For form
  staffForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  staffSubmitted(){
    console.log(this.staffForm.value);
  }

  get name(): FormControl {
    return this.staffForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.staffForm.get('email') as FormControl;
  }
  // For modal
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

  // For table
  displayedColumns: string[] = ['staffId', 'name', 'email', 'position', 'status', 'action'];
  dataSource = staffDetails;
}
