import { TestBed, inject } from '@angular/core/testing';

import { AccountFileLoaderService } from './account-file-loader.service';

describe('AccountFileLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountFileLoaderService]
    });
  });

  it('should be created', inject([AccountFileLoaderService], (service: AccountFileLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
