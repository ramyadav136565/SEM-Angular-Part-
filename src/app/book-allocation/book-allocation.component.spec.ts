import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAllocationComponent } from './book-allocation.component';

describe('BookAllocationComponent', () => {
  let component: BookAllocationComponent;
  let fixture: ComponentFixture<BookAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
