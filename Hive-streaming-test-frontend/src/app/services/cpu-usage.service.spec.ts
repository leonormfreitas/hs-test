import { TestBed } from '@angular/core/testing';

import { CpuUsageService } from './cpu-usage.service';

describe('CpuUsageService', () => {
  let service: CpuUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpuUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
