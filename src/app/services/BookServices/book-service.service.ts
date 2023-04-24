
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  url = "http://localhost:63832/"

  constructor(private Http: HttpClient) { }

  showAllBooks(): Observable<any> {
    return this.Http.get(this.url + "ShowAllBooks");
  }

  deleteBook(id: Number): Observable<ArrayBuffer> {
    return this.Http.delete(this.url + 'DeleteBook/' + id, { responseType: 'arraybuffer' });
  }

  addBook(data: any): Observable<any> {
    return this.Http.post<any>(this.url + `AddBooks?BookName=${data.bookName}&BookAuthor=${data.bookAuthor}&BookPrice=${data.bookPrice}&Course=${data.course}`, data);
  }
  
  updateBook(data: any): Observable<any> {
    return this.Http.put<any>(this.url + 'UpdateBook', data);
  }

  getBookById(id: number): Observable<any> {
    return this.Http.get<any>(this.url + 'ShowBookById/' + id);
  }
}
