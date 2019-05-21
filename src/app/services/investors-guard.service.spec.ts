import { TestBed } from '@angular/core/testing';

import { InvestorsGuardService } from './investors-guard.service';

describe('InvestorsGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestorsGuardService = TestBed.get(InvestorsGuardService);
    expect(service).toBeTruthy();
  });
});
