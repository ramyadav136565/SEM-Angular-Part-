import { TestBed } from '@angular/core/testing';

import { UniversitiyServiceService } from './universitiy-service.service';

describe('UniversitiyServiceService', () => {
  let service: UniversitiyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversitiyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
