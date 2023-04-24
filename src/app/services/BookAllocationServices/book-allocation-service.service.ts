import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookAllocationServiceService{
  url = "http://localhost:63832/"

  constructor(private Http:HttpClient) { }

  showAllocatedBooks():Observable<any>{
    return this.Http.get(this.url+"ShowAllocatedBooks");
  }
  deleteBookAllocation(id: Number): Observable<ArrayBuffer> {
    return this.Http.delete(this.url + 'DeleteAllocatedBook/' + id, { responseType: 'arraybuffer' });
  }
  getBookAllocationByIds(data:any): Observable<any> {
    return this.Http.get<any>(this.url + 'GetAllocatedBooskByUniversityIdAndStudentId/'+data.universityId+'/'+data.studentId);
  }
  getBookAllocationByUniversityIdAndTerm(data:any): Observable<any> {
    return this.Http.get<any>(this.url + 'GetAllocatedBooksToUniversity/'+data.universityId+'/'+data.term);
  }//pending to handle exception in backend

  allocateBookToStudent(data:any): Observable<any> {
    console.log(data);
    return this.Http.post<any>(this.url + 'AllocateBookToStudent/'+data.studentId+'/'+data.bookId+'/'+data.universityId,data);
  }
  updateBookAllocation(data:any): Observable<any> {
    return this.Http.put<any>(this.url + 'UpdateAllocatedBooksToStudent',data);
  }
  getBookAllocationById(id:any): Observable<any> {
    return this.Http.get<any>(this.url + 'GetBookAllocationById/'+id);
  }

  
  getInvoiceById(id:number): Observable<any> {
    return this.Http.get<any>(this.url + 'GetInvoiceDetailsById/'+id);
  }
}