import { TestBed } from '@angular/core/testing';

import { EnrollguardService } from './enrollguard.service';

describe('EnrollguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrollguardService = TestBed.get(EnrollguardService);
    expect(service).toBeTruthy();
  });
});
