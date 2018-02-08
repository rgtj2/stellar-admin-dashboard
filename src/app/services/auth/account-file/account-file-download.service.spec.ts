import { AccountFileCreatorService } from './account-file-creator.service';
import { TestBed, inject } from '@angular/core/testing';

import { AccountFileDownloadService } from './account-file-download.service';

describe('AccountFileDownloadService', () => {
  let service: AccountFileDownloadService;
  let mockAccountFileCreator;

  beforeEach(() => {
    mockAccountFileCreator = jasmine.createSpyObj('AccountFileCreator', ['encryptAccountMasterFile']);
    TestBed.configureTestingModule({
      providers: [
        AccountFileDownloadService,
        {provide: AccountFileCreatorService, useValue: mockAccountFileCreator}
      ]
    });
  });

  beforeEach(inject([AccountFileDownloadService], (s: AccountFileDownloadService) => {
    service = s;
  }));
});
