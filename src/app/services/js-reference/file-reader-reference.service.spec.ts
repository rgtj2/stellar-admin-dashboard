import { TestBed, inject } from '@angular/core/testing';

import { FileReaderReferenceService } from './file-reader-reference.service';

describe('FileReaderReferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileReaderReferenceService]
    });
  });

  it('should be created', inject([FileReaderReferenceService], (service: FileReaderReferenceService) => {
    expect(service).toBeTruthy();
  }));
});
