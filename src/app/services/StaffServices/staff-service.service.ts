
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffServiceService {
  url = "http://localhost:63832/"

  constructor(private Http:HttpClient) { }

  showAllUsers():Observable<any>{
    return this.Http.get(this.url+"ShowAllUsers");
  }
  deleteUsers(id: Number): Observable<ArrayBuffer> {
    return this.Http.delete(this.url + 'DeleteUser' +id, { responseType: 'arraybuffer' });
  }
  
  addUsers(data:any): Observable<any> {
    return this.Http.post<any>(this.url + 'AddNewUser',data);
  }
  updateUsers(data:any): Observable<any> {
    return this.Http.put<any>(this.url + 'UpdateUser',data);
  }

  getUsersById(id:number): Observable<any> {
    return this.Http.get<any>(this.url + 'GetUserById/'+id);
  }
}