import { TestBed, inject } from '@angular/core/testing';

import { AccountFileDownloadService } from './account-file-download.service';

describe('AccountFileDownloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountFileDownloadService]
    });
  });

  it('should be created', inject([AccountFileDownloadService], (service: AccountFileDownloadService) => {
    expect(service).toBeTruthy();
  }));
});
