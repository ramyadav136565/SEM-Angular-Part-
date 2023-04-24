import { TestBed } from '@angular/core/testing';

import { BookAllocationServiceService } from './book-allocation-service.service';

describe('BookAllocationServiceService', () => {
  let service: BookAllocationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAllocationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
