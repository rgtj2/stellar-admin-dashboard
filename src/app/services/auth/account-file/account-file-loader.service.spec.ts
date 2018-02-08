import { TestBed, inject } from '@angular/core/testing';

import { AccountFileLoaderService } from './account-file-loader.service';
import { AccountFileReaderService } from './account-file-reader.service';

describe('AccountFileLoaderService', () => {
  let service: AccountFileLoaderService;
  let mockAccountFileReader;

  beforeEach(() => {
    mockAccountFileReader = jasmine.createSpyObj('AccountFileReader', ['readRawFile']);
    TestBed.configureTestingModule({
      providers: [
        AccountFileLoaderService,
        {provide: AccountFileReaderService, useValue: mockAccountFileReader}
      ]
    });
  });

  beforeEach(inject([AccountFileLoaderService], (s: AccountFileLoaderService) => {
    service = s;
  }));
});
