import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface university {
  id: number;
  name: string;
  address: string;
  action: number;
}

const universityDetails: university[] = [
  {id: 1001, name: 'Solicon', address:'Mumbai', action: 1},
  {id: 1002, name: 'DAVV', address: 'Indore', action: 2},
  {id: 1003, name: 'HIT', address: 'Haldia', action: 1}
];

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})

export class UniversityComponent{
  
  panelOpenState1 = true;

  // For Forms
  universityForm = new FormGroup({
    uniName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  uniSubmitted(){
    console.log(this.universityForm.value);
  }

  get uniName(): FormControl {
    return this.universityForm.get('uniName') as FormControl;
  }

  get address(): FormControl {
    return this.universityForm.get('address') as FormControl;
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
  displayedColumns: string[] = ['id', 'name', 'address', 'action'];
  dataSource = universityDetails;

}


