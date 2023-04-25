import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadServicesService {

  constructor() { }
  studenturl ='http://localhost:63832/Export'
  staffurl ='http://localhost:63832/UsersExport'
  universityurl='http://localhost:63832/UniversityExport'
  bookurl='http://localhost:63832/BookExport'
  
}
