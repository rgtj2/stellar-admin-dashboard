import { TestBed, inject } from '@angular/core/testing';

import { FriendbotService } from './friendbot.service';

describe('FriendbotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FriendbotService]
    });
  });

  it('should be created', inject([FriendbotService], (service: FriendbotService) => {
    expect(service).toBeTruthy();
  }));
});
