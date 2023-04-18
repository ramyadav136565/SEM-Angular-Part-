import { Component, OnInit } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-check-d',
  templateUrl: './check-d.component.html',
  styleUrls: ['./check-d.component.css']
})
export class CheckDComponent implements OnInit {
  formModal: any;
 
  constructor() {}
 
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
 
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
}