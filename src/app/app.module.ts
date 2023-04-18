import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component';
import { StudentComponent } from './student/student.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { DialogComponent } from './dialog/dialog.component';
import { CheckDComponent } from './check-d/check-d.component';
import { BookComponent } from './book/book.component';
import { BookAllocationComponent } from './book-allocation/book-allocation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageFooterComponent,
    PageHeaderComponent,
    SideNavComponent,
    StaffComponent,
    LoginComponent,
    UniversityComponent,
    StudentComponent,
    InvoiceComponent,
    DialogComponent,
    CheckDComponent,
    BookComponent,
    BookAllocationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
