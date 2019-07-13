import { TestBed } from '@angular/core/testing';

import { AdmintransService } from './admintrans.service';

describe('AdmintransService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmintransService = TestBed.get(AdmintransService);
    expect(service).toBeTruthy();
  });
});
