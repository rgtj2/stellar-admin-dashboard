import { StellarAccountKeypair } from './../../../shared/models/stellar-account/stellar-account-keypair';
import { StellarAccountGeneratorService } from './stellar-account-generator.service';

import { TestBed, inject } from '@angular/core/testing';
import { StellarBaseSdkService } from '../../stellar-sdk/stellar-base-sdk.service';

describe('StellarAccountGeneratorService', () => {
  let service: StellarAccountGeneratorService;
  let mockSDKService, mockBaseSdk, mockRandomKeypair;
  let mockPublicKey, mockSecret;

  beforeEach(() => {
    /**
     * Mock the js-stellar-base SDK
     * TODO: Move parts of this out..
     */
    mockBaseSdk = {
      Keypair: jasmine.createSpyObj('Keypair', ['random'])
    };
    mockSDKService = {base: mockBaseSdk};
    mockRandomKeypair = jasmine.createSpyObj('RandomKeyPair', ['secret', 'publicKey']);
    mockPublicKey = 'GXXX';
    mockSecret = 'SXXX';
    mockRandomKeypair.publicKey.and.returnValue(mockPublicKey);
    mockRandomKeypair.secret.and.returnValue(mockSecret);
    mockBaseSdk.Keypair.random.and.returnValue(mockRandomKeypair);

    TestBed.configureTestingModule({
      providers: [
        StellarAccountGeneratorService,
        {provide: StellarBaseSdkService, useValue: mockSDKService}
      ]
    });
  });

  beforeEach(inject([StellarAccountGeneratorService], (s: StellarAccountGeneratorService) => {
    service = s;
  }));

  describe('.generateKeypair', () => {
    let mockAccount: StellarAccountKeypair;

    beforeEach(() => {
      mockAccount = service.generateKeypair();
    });

    describe('when generating a keypair', () => {
      it('should call Keypair.random()', () => {
        expect(mockBaseSdk.Keypair.random).toHaveBeenCalled();
      });
    });

    describe('when returning a value', () => {
      it('should return a StellarAccountKeypair', () => {
        expect(mockAccount instanceof StellarAccountKeypair).toBe(true);
      });
      it('should have a publicKey', () => {
        expect(mockAccount.publicKey).toBe(mockPublicKey);
      });
      it('should have a secret', () => {
        expect(mockAccount.secret).toBe(mockSecret);
      });
    });
  });
});
