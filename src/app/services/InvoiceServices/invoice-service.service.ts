import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService{
  url = "http://localhost:63832/"

  constructor(private Http:HttpClient) { }

  showAllInvoices():Observable<any>{
    return this.Http.get(this.url+"ShowAllInvoices");
  }
  generateInvoice(data:any): Observable<any> {
    return this.Http.get<any>(this.url + 'GenerateInvoice/'+data.universityId+'/'+data.term);
  }

  createInvoice(data:any): Observable<any> {
    // console.log(data);
    return this.Http.post<any>(this.url + 'CreateInvoice/'+data.universityId+'/'+data.term,data);
  }

  getInvoiceById(id:number): Observable<any> {
    return this.Http.get<any>(this.url + 'GetInvoiceDetailsById/'+id);
  }

  downloadCSV(id:number): Observable<any> {
    return this.Http.get<any>(this.url + 'invoices/'+id);
  }

}