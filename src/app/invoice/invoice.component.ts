import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthenticationServiceService } from '../services/AuthenticationServices/authentication-service.service';
import { InvoiceServiceService } from '../services/InvoiceServices/invoice-service.service';
import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';


export interface Invoice {
  
  universityId: any;
  term: any;
  bookQuantity: any;
  tax: any;
  totalAmount: any;
  // action: number;
}
 
interface University {
  value: number;
  viewValue: string;
}

interface Term {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent {

  constructor(private http: HttpClient,private invoiceService:InvoiceServiceService,private universityService:UniversitiyServiceService,private loginService :AuthenticationServiceService) { }

  dataSource = new MatTableDataSource<any>
@ViewChild('paginator') paginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;
  title: any;
  hideControl: any;
  loginFlag:any=false;
  invoiceId: any;
  Tax:any;
  TotalAmount :any;
  UniversityId:any;
  Term:any;
  panelOpenState = true;  
  panelOpenState2 = true;
  InvoiceList: any = [];
  UniversityList:any=[];
  universities: University[] = [];

invoiceForm = new FormGroup({
  universityId: new FormControl('', Validators.required),
  term: new FormControl('', Validators.required)
});

showUniversityList() {
  this.universityService.showAllUniversities().subscribe(data => {
    this.UniversityList = data;
    console.log(data);
    for (let i = 0; i < this.UniversityList.length; i++) {
      this.universities.push({
        value: this.UniversityList[i].universityId,
        viewValue: this.UniversityList[i].name
      });
    }
    console.log(this.universities)
  });
}


  ShowAllInvoices() {
    this.invoiceService.showAllInvoices().subscribe(data => {
      this.InvoiceList = data;
      this.dataSource = new MatTableDataSource(this.InvoiceList);
       this.dataSource.paginator = this.paginator;

    });
  }

  GenerateInvoice() {
      this.hideControl = false;
      this.invoiceService.generateInvoice(this.invoiceForm.value)
        .subscribe({
          next: (response) => {
            this.isPanelOpen=true;
            this.UniversityId=response.universityId;
            this.Term=response.term;
            this.Tax = response.tax;
            this.TotalAmount = response.totalAmount;
            // window.alert("Invoice generated SuccessFully");
            // location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
            location.reload();
            console.log(error);
          }
        });
    }


    download() {
      this.invoiceService.downloadCSV(this.invoiceId).subscribe(response => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'InvoiceDetails.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
    CreateInvoice() {
      this.hideControl = false;
      this.invoiceService.createInvoice(this.invoiceForm.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.CloseModel();
            window.alert("Invoice generated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
            location.reload();
            console.log(error);
          }
        });
    }

    downloadCSV(invoiceId: number): void {
      this.http.get(this.invoiceService.url + 'invoices/'+invoiceId, { responseType: 'arraybuffer' }).subscribe((data: ArrayBuffer) => {
        const blob = new Blob([data], {type: 'application/octet-stream'});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'InvoiceDetailsId'+ invoiceId +'.csv';
        link.click();
      });
    }
  // For table
  displayedColumns: string[] = ['id', 'universityName', 'term', 'bookQuantity', 'tax', 'totalAmount', 'action'];
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
  }

  closeModal1n2(){
    this.CloseModel();
    this.CloseModel2();
    this.isPanelOpen = false;
  }
  closeModal3n1(){
    this.CloseModel3();
    this.CloseModel();
    this.isPanelOpen = false;
  }

  ngOnInit(): void {
    this.loginFlag=this.loginService.loginFlag;
    this.showUniversityList();
    this.ShowAllInvoices();
  }

  terms: Term[] = [
    {value: 1, viewValue: '1st sem'},
    {value: 2, viewValue: '2nd sem'},
    {value: 3, viewValue: '3rd sem'},
    {value: 4, viewValue: '4th sem'},
    {value: 5, viewValue: '5th sem'},
    {value: 6, viewValue: '6th sem'},
    {value: 7, viewValue: '7th sem'},
    {value: 8, viewValue: '8th sem'}
  ];

  isPanelOpen = false;

  

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
}
}
