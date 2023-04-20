import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  universityName: string;
  term: number;
  bookQuantity: number;
  tax: number;
  totalAmount: number;
  action: number;
}
 
interface University {
  value: string;
  viewValue: string;
}

interface Term {
  value: number;
  viewValue: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1001, universityName: 'Solicon', term:8, bookQuantity:6, tax:10, totalAmount:1870, action: 1},
  {id: 1002, universityName: 'DAVV', term: 7, bookQuantity:5, tax:1, totalAmount:1717, action: 2},
  {id: 1003, universityName: 'HIT', term: 8, bookQuantity:8, tax:10, totalAmount:1870, action: 1}
];

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent {
  panelOpenState = true;
  panelOpenState2 = true;
  total = 5000;
  taxes = (this.total*0.01)
  totAmt = (this.total + this.taxes);

  // For table
  displayedColumns: string[] = ['id', 'universityName', 'term', 'bookQuantity', 'tax', 'totalAmount', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // For Form
  invoiceForm = new FormGroup({
    uniId: new FormControl('', Validators.required),
    term: new FormControl('', Validators.required),
  });

  invoiceSubmitted(){
    console.log(this.invoiceForm.value);
    
  }

  // For Modal
  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
    this.invoiceForm.reset();
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } 
    // this.CloseModel2();
  }

  CloseModel2() {
    const modelDiv = document.getElementById('myModal2');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } 
    this.invoiceForm.reset();
  }

  openModel3() {
    const modelDiv = document.getElementById('myModal3');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }
  CloseModel3() {
    const modelDiv = document.getElementById('myModal3');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } 
  }

  closeModel1ntext(){
    this.CloseModel();
    this.isPanelOpen = false;
  }

  openAndClose1(){
    this.openModel3();
    // this.CloseModel();
    // this.isPanelOpen = false;
  }

  closeModal1n2(){
    this.CloseModel();
    this.CloseModel2();
    this.isPanelOpen = false;
  }
  // openAndCloseModels() {
  //   // this.openModel();
  //   this.CloseModel2();
  //   this.CloseModel();
  // }

  // closeModal1n2() {
  //   this.CloseModel();
  //   this.CloseModel2();
  // }

  closeModal3n1(){
    this.CloseModel3();
    this.CloseModel();
    this.isPanelOpen = false;
  }

  universities: University[] = [
    {value: '1001', viewValue: 'Solicon'},
    {value: '1002', viewValue: 'DAVV'},
    {value: '1003', viewValue: 'HIT'},
  ];

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

  isPanelOpen = false;

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
