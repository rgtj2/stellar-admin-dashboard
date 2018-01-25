import { TestBed, inject } from '@angular/core/testing';

import { HorizonApiService } from './horizon-api.service';

describe('HorizonApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorizonApiService]
    });
  });

  it('should be created', inject([HorizonApiService], (service: HorizonApiService) => {
    expect(service).toBeTruthy();
  }));
});
