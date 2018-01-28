import { TestBed, inject } from '@angular/core/testing';

import { StellarBaseSdkService } from './stellar-base-sdk.service';

describe('StellarBaseSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StellarBaseSdkService]
    });
  });

  it('should be created', inject([StellarBaseSdkService], (service: StellarBaseSdkService) => {
    expect(service).toBeTruthy();
  }));
});
