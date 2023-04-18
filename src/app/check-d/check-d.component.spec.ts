import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDComponent } from './check-d.component';

describe('CheckDComponent', () => {
  let component: CheckDComponent;
  let fixture: ComponentFixture<CheckDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
