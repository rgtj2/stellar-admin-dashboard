import { TestBed, inject } from '@angular/core/testing';

import { AccountGeneratorService } from './account-generator.service';

describe('AccountGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountGeneratorService]
    });
  });

  it('should be created', inject([AccountGeneratorService], (service: AccountGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
