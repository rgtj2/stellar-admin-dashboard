import { Account } from '../../../shared/models/account';
import { AccountGeneratorService } from './account-generator.service';

import { TestBed, inject } from '@angular/core/testing';
import { StellarBaseSdkService } from '../../stellar-sdk/stellar-base-sdk.service';

describe('AccountGeneratorService', () => {
  let service: AccountGeneratorService;
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
    mockPublicKey = 'Hi!!';
    mockSecret = 'Shhh!!!';
    mockRandomKeypair.publicKey.and.returnValue(mockPublicKey);
    mockRandomKeypair.secret.and.returnValue(mockSecret);
    mockBaseSdk.Keypair.random.and.returnValue(mockRandomKeypair);

    TestBed.configureTestingModule({
      providers: [
        AccountGeneratorService,
        {provide: StellarBaseSdkService, useValue: mockSDKService}
      ]
    });
  });

  beforeEach(inject([AccountGeneratorService], (s: AccountGeneratorService) => {
    service = s;
  }));

  describe('.generateAccount', () => {
    let mockAccount: Account;
    beforeEach(() => {
      mockAccount = service.generateAccount();
    });
    describe('when generating an account', () => {
      it('should call Keypair.random()', () => {
        expect(mockBaseSdk.Keypair.random).toHaveBeenCalled();
      });
    });

    describe('when returning a value', () => {
      it('should return an Account', () => {
        expect(mockAccount instanceof Account).toBe(true);
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
