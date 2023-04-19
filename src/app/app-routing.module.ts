import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { UniversityComponent } from './university/university.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StudentComponent } from './student/student.component';
import { DialogComponent } from './dialog/dialog.component';
import { CheckDComponent } from './check-d/check-d.component';
import { BookComponent } from './book/book.component';
import { BookAllocationComponent } from './book-allocation/book-allocation.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'login/staff', component:StaffComponent},
  {path:'staff', component:StaffComponent},
  {path:'university', component:UniversityComponent},
  {path:'student', component:StudentComponent},
  {path:'invoice', component:InvoiceComponent},
  {path:'book', component:BookComponent},
  {path:'bookAllocate', component:BookAllocationComponent},
  {path:'dialog', component:DialogComponent},
  {path:'checkD', component:CheckDComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
