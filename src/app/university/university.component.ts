
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UniversitiyServiceService } from '../services/UniversityServices/universitiy-service.service';

export interface Status {
  value: boolean;
  viewValue: string;
}

export interface University{
  name: any;
  address: any;
}

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
})

export class UniversityComponent {
constructor(private universityService:UniversitiyServiceService) {}

title: any;
hideControl: any;
formName: any = true;


  UniversityList:any=[];
  showUniversityList(){
    this.universityService.showAllUniversities().subscribe(data=>{
      this.UniversityList=data;
      console.log(data);
    });
  }

  getUniversityById(id: number) {
    this.hideControl = true;
    this.formName = false;
    this.universityService.getUniversityById(id).subscribe(data => {
      this.openModel();
      this.title = "Update University"
      this.updateForm = new FormGroup({
         universityId: new FormControl(data.universityId, Validators.required),
        name: new FormControl(data.name, Validators.required),
        address: new FormControl(data.address, Validators.required),
        isDeleted: new FormControl(data.isDeleted, Validators.required)
      });
      console.log(data);
    });
  }

  AddUpdateUniversity() {
    if (this.title == "Add University") {
      this.hideControl = false;
      this.universityService.addUniversity(this.addForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("University added SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
            console.log(error);
          }
        });
    }
    else {
      this.formName = false;
      this.universityService.updateUniversity(this.updateForm.value)
        .subscribe({
          next: (response) => {
            this.CloseModel();
            window.alert("University updated SuccessFully");
            location.reload();
          },
          error: (error: any) => {
            window.alert(error.error);
            console.log(error);
          }
        });
    }
  }

  deleteUniversity(id: number): void {
    if (window.confirm("Are you sure you want to delete this university ?")) {
    this.universityService.deleteUniversity(id).subscribe({
      next: (response: ArrayBuffer) => {
        const message = new TextDecoder().decode(response);
        window.alert(message);
        console.log(message);
        location.reload();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  }

  panelOpenState1 = true;

  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    universityId: new FormControl('', Validators.required),
    isDeleted: new FormControl('', Validators.required)
  });

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });
  
 
  uniSubmitted() {
    console.log(this.updateForm.value);
  }

  // For modal
  openModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
      location.reload();
    }
  }

  ngOnInit(): void {
    this.showUniversityList();
    this.title = "Add University"
  }

  get validName(): FormControl {
    if (this.title == "Add University") {
      return this.addForm.get('name') as FormControl;
    } else {
      return this.updateForm.get('name') as FormControl;
    }
  }
  get validAddress(): FormControl {
    if (this.title == "Add University") {
      return this.addForm.get('address') as FormControl;
    } else {
      return this.updateForm.get('address') as FormControl;
    }
  }

  status: Status[] = [
    { value: true, viewValue: 'Inctive' },
    { value: false, viewValue: 'Active' },
  ];

   // For table
  displayedColumns: string[] = ['id', 'name', 'address', 'action'];
}
