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
      describe('- Keypair:', () => {
        let keypair;
        beforeEach(() => {
          keypair = service.base.Keypair;
        });
        it('should exist', () => {
          expect(keypair).toBeDefined();
        });
        describe('.random should return an object', () => {
          let random;
          beforeEach(() => {
            random = keypair.random();
          });
          it('should have a type property', () => {
            expect(random.type).toBe('ed25519');
          });
          describe('with publicKey()', () => {
            let publicKey;
            beforeEach(() => {
              publicKey = random.publicKey();
            });
            it('should start with a G', () => {
              expect(publicKey).toMatch(/^G/);
            });
            it('should be 56 characters', () => {
              expect(publicKey.length).toBe(56);
            });
          });
        });
      });
    });
  });
});
