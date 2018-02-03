import { TestBed, inject } from '@angular/core/testing';

import { AccountFileReaderService } from './account-file-reader.service';

describe('AccountFileReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountFileReaderService]
    });
  });

  it('should be created', inject([AccountFileReaderService], (service: AccountFileReaderService) => {
    expect(service).toBeTruthy();
  }));
});
