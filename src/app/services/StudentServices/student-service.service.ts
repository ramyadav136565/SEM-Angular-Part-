import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  url = "http://localhost:63832/"

  constructor(private Http:HttpClient) { }

  showAllStudents():Observable<any>{
    return this.Http.get(this.url+"ShowAllStudents");
  }
  deleteStudent(id: Number): Observable<ArrayBuffer> {
    return this.Http.delete(this.url + 'DeleteStudent/' + id, { responseType: 'arraybuffer' });
  }
  
  addStudent(data:any): Observable<any> {
    return this.Http.post<any>(this.url + 'AddStudent',data);
  }
  updateStudent(data:any): Observable<any> {
    return this.Http.put<any>(this.url + 'UpdateStudent',data);
  }

  getStudentById(id:number): Observable<any> {
    return this.Http.get<any>(this.url + 'ShowStudentById/'+id);
  }
}