import { TestBed, inject } from '@angular/core/testing';

import { StellarBaseSdkService } from './stellar-base-sdk.service';

describe('StellarBaseSdkService', () => {
  let service: StellarBaseSdkService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StellarBaseSdkService]
    });
  });

  beforeEach(inject([StellarBaseSdkService], (s: StellarBaseSdkService) => {
    service = s;
  }));

  describe('.base', () => {
    describe('with StellarBaseSDK methods', () => {
      it('should have Keypair', () => {
        expect(service.base.Keypair).toBeDefined();
      });
    });
  });
});
