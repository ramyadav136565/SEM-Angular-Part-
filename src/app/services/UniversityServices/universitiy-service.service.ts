import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UniversitiyServiceService {
  url = "http://localhost:63832/"

  constructor(private Http:HttpClient) { }

  showAllUniversities():Observable<any>{
    return this.Http.get(this.url+"ShowAllUniversities");
  }
  deleteUniversity(id: Number): Observable<ArrayBuffer> {
    return this.Http.delete(this.url + 'DeleteUniversity/' + id, { responseType: 'arraybuffer' });
  }
  
  addUniversity(data:any): Observable<any> {
    return this.Http.post<any>(this.url + 'AddUniversity',data);
  }
  updateUniversity(data:any): Observable<any> {
    return this.Http.put<any>(this.url + 'UpdateUniversity',data);
  }

  getUniversityById(id:number): Observable<any> {
    return this.Http.get<any>(this.url + 'SearchUniversityById/'+id);
  }
}
