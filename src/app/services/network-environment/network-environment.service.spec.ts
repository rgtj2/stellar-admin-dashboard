import { TEST_HORIZON_URL, PRODUCTION_HORIZON_URL } from './../injection-tokens';
import { TestBed, inject } from '@angular/core/testing';

import { NetworkEnvironmentService } from './network-environment.service';

describe('NetworkEnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkEnvironmentService,
        {provide: TEST_HORIZON_URL, useValue: 'test.horizon.url'},
        {provide: PRODUCTION_HORIZON_URL, useValue: 'production.horizon.url'}
      ]
    });
  });

  it('should be created', inject([NetworkEnvironmentService], (service: NetworkEnvironmentService) => {
    expect(service).toBeTruthy();
  }));
});
