import { TestBed, inject } from '@angular/core/testing';

import { AccountFileReaderService } from './account-file-reader.service';
import { Subject } from 'rxjs/Subject';

describe('AccountFileReaderService', () => {
  let service: AccountFileReaderService;
  let mockFileReaderReference, mockRead;

  beforeEach(() => {
    mockFileReaderReference = jasmine.createSpyObj('parseFileText');
    mockRead = new Subject();
    mockFileReaderReference.parseFileText.and.returnValue(mockRead);
    TestBed.configureTestingModule({
      providers: [AccountFileReaderService]
    });
  });

  beforeEach(inject([AccountFileReaderService], (s: AccountFileReaderService) => {
    service = s;
  }));
});
