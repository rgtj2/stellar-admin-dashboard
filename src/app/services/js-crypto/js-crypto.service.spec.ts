import { TestBed, inject } from '@angular/core/testing';

import { JSCryptoService } from './js-crypto.service';

describe('JSCryptoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JSCryptoService]
    });
  });

  it('should be created', inject([JSCryptoService], (service: JSCryptoService) => {
    expect(service).toBeTruthy();
  }));
});
