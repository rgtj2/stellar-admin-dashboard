import { TestBed, inject } from '@angular/core/testing';

import { AccountGeneratorService } from './account-generator.service';

describe('AccountGeneratorService', () => {
  let service: AccountGeneratorService;
  let mockBaseSdk, mockRandomKeypair;

  beforeEach(() => {
    /**
     * Mock the js-stellar-base SDK
     * TODO: Move parts of this out..
     */
    mockBaseSdk = {
      Keypair: jasmine.createSpyObj('Keypair', ['random'])
    };
    mockRandomKeypair = jasmine.createSpyObj('RandomKeyPair', ['secret', 'publicKey']);
    mockBaseSdk.Keypair.random.and.returnValue(mockRandomKeypair);

    TestBed.configureTestingModule({
      providers: [AccountGeneratorService]
    });
  });

  beforeEach(inject([AccountGeneratorService], (s: AccountGeneratorService) => {
    service = s;
  }));

  describe('.generateAccount', () => {
    it('should call Keypair.random()');
    it('should return a secret / public key');
  });
});
