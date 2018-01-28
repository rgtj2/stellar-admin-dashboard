import { TEST_HORIZON_URL, PRODUCTION_HORIZON_URL } from './../injection-tokens';
import { TestBed, inject } from '@angular/core/testing';

import { NetworkEnvironmentService } from './network-environment.service';

describe('NetworkEnvironmentService', () => {
  let service: NetworkEnvironmentService;
  const mockTestHorizonURL = 'test.horizon.url';
  const mockProductionHorizonURL = 'production.horizon.url';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkEnvironmentService,
        {provide: TEST_HORIZON_URL, useValue: mockTestHorizonURL},
        {provide: PRODUCTION_HORIZON_URL, useValue: mockProductionHorizonURL}
      ]
    });
  });

  beforeEach(inject([NetworkEnvironmentService], (s: NetworkEnvironmentService) => {
    service = s;
  }));

  describe('.horizonURL / .setHorizonURL', () => {
    describe('when setting the test environment', () => {
      beforeEach(() => {
        service.setHorizonURL('test');
      });
      it('should use the test horizon url', () => {
        expect(service.horizonURL).toBe(mockTestHorizonURL);
      });
    });
    describe('when setting the production environment', () => {
      beforeEach(() => {
        service.setHorizonURL('production');
      });
      it('should use the production horizon url', () => {
        expect(service.horizonURL).toBe(mockProductionHorizonURL);
      });
    });
  });
});
