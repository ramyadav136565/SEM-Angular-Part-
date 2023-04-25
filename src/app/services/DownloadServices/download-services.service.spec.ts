import { TestBed } from '@angular/core/testing';

import { DownloadServicesService } from './download-services.service';

describe('DownloadServicesService', () => {
  let service: DownloadServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
