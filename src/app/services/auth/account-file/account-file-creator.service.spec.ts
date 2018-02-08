import { JSCryptoService } from './../../js-crypto/js-crypto.service';
import { TestBed, inject } from '@angular/core/testing';

import { AccountFileCreatorService } from './account-file-creator.service';

describe('AccountFileCreatorService', () => {
  let service: AccountFileCreatorService;
  let mockJSCrypto;

  beforeEach(() => {
    mockJSCrypto = jasmine.createSpyObj('JSCrypto', ['encryptJSON', 'decryptJSON']);
    TestBed.configureTestingModule({
      providers: [
        AccountFileCreatorService,
        {provide: JSCryptoService, useValue: mockJSCrypto}
      ]
    });
  });

  beforeEach(inject([AccountFileCreatorService], (s: AccountFileCreatorService) => {
    service = s;
  }));
});
