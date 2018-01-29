import { HORIZON_TEST_URL, HORIZON_PRODUCTION_URL, NETWORK_IS_PERSISTENT } from './../injection-tokens';
import { NetworkEnvironmentService } from './network-environment.service';

import { TestBed, inject } from '@angular/core/testing';

describe('NetworkEnvironmentService', () => {
  let service: NetworkEnvironmentService;
  const mockHorizonTestURL = 'test.horizon.url';
  const mockHorizonProductionURL = 'production.horizon.url';
  const networkIsPersistent = false;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkEnvironmentService,
        {provide: HORIZON_TEST_URL, useValue: mockHorizonTestURL},
        {provide: HORIZON_PRODUCTION_URL, useValue: mockHorizonProductionURL},
        {provide: NETWORK_IS_PERSISTENT, useValue: networkIsPersistent}
      ]
    });
  });

  beforeEach(inject([NetworkEnvironmentService], (s: NetworkEnvironmentService) => {
    service = s;
  }));

  describe('.horizonConfig / .setHorizonConfig', () => {
    describe('when setting the test environment', () => {
      beforeEach(() => {
        service.setHorizonConfig('test');
      });
      it('should have the proper url', () => {
        expect(service.horizonConfig.url).toBe(mockHorizonTestURL);
      });
      it('should have friendbot enabled', () => {
        expect(service.horizonConfig.friendbotIsEnabled).toBe(true);
      });
      it('should have the networkIsPersistent property', () => {
        expect(service.horizonConfig.networkIsPersistent).toBe(networkIsPersistent);
      });
    });
    describe('when setting the production environment', () => {
      beforeEach(() => {
        service.setHorizonConfig('production');
      });
      it('should have the proper url', () => {
        expect(service.horizonConfig.url).toBe(mockHorizonProductionURL);
      });
      it('should have friendbot enabled', () => {
        expect(service.horizonConfig.friendbotIsEnabled).toBe(false);
      });
      it('should have the networkIsPersistent property', () => {
        expect(service.horizonConfig.networkIsPersistent).toBe(networkIsPersistent);
      });
    });
  });
});
