import { HORIZON_TEST_URL, HORIZON_PRODUCTION_URL, FRIENDBOT_IS_ENABLED, NETWORK_IS_PERSISTENT } from './../injection-tokens';
import { NetworkEnvironmentService } from './network-environment.service';

import { TestBed, inject } from '@angular/core/testing';

describe('NetworkEnvironmentService', () => {
  let service: NetworkEnvironmentService;
  const mockHorizonTestURL = 'test.horizon.url';
  const mockHorizonProductionURL = 'production.horizon.url';
  const friendbotIsEnabled = true;
  const networkIsPersistent = false;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkEnvironmentService,
        {provide: FRIENDBOT_IS_ENABLED, useValue: friendbotIsEnabled},
        {provide: HORIZON_TEST_URL, useValue: mockHorizonTestURL},
        {provide: HORIZON_PRODUCTION_URL, useValue: mockHorizonProductionURL},
        {provide: NETWORK_IS_PERSISTENT, useValue: networkIsPersistent}
      ]
    });
  });

  beforeEach(inject([NetworkEnvironmentService], (s: NetworkEnvironmentService) => {
    service = s;
  }));

  describe('.friendbotIsEnabled', () => {
    it('should have the injected value', () => {
      expect(service.friendbotIsEnabled).toBe(friendbotIsEnabled);
    });
  });


  describe('.isPersistent', () => {
    it('should have the injected value', () => {
      expect(service.isPersistent).toBe(networkIsPersistent);
    });
  });

  describe('.horizonURL / .setHorizonURL', () => {
    describe('when setting the test environment', () => {
      beforeEach(() => {
        service.setHorizonURL('test');
      });
      it('should use the test horizon url', () => {
        expect(service.horizonURL).toBe(mockHorizonTestURL);
      });
    });
    describe('when setting the production environment', () => {
      beforeEach(() => {
        service.setHorizonURL('production');
      });
      it('should use the production horizon url', () => {
        expect(service.horizonURL).toBe(mockHorizonProductionURL);
      });
    });
  });
});
