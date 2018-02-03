import { TestBed, inject } from '@angular/core/testing';

import { AccountFileCreatorService } from './account-file-creator.service';

describe('AccountFileCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountFileCreatorService]
    });
  });

  it('should be created', inject([AccountFileCreatorService], (service: AccountFileCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
