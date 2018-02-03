import { TestBed, inject } from '@angular/core/testing';

import { TwoFactorService } from './two-factor.service';

describe('TwoFactorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwoFactorService]
    });
  });

  it('should be created', inject([TwoFactorService], (service: TwoFactorService) => {
    expect(service).toBeTruthy();
  }));
});
