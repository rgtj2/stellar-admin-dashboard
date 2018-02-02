import {
  CUSTOM_HORIZON_PRODUCTION_URL,
  CUSTOM_HORIZON_TEST_URL,
  CUSTOM_NETWORK_PRODUCTION_PASSPHRASE,
  CUSTOM_NETWORK_TEST_PASSPHRASE,
  STELLAR_HORIZON_PRODUCTION_URL,
  STELLAR_HORIZON_TEST_URL,
  STELLAR_NETWORK_PRODUCTION_PASSPHRASE,
  STELLAR_NETWORK_TEST_PASSPHRASE
} from './../injection-tokens';
import { NetworkEnvironmentService } from './network-environment.service';

import { TestBed, inject } from '@angular/core/testing';

describe('NetworkEnvironmentService', () => {
  let service: NetworkEnvironmentService;
  const mockCustomHorizonProductionURL = 'production.my-horizon.url';
  const mockCustomHorizonTestURL = 'test.my-horizon.url';
  const customNetworkProductionPassphrase = 'Production network passphrase; Prince 1999';
  const customNetworkTestPassphrase = 'Test network passphrase; Prince 1999';
  const mockStellarHorizonProductionURL = 'production.horizon.url';
  const mockStellarHorizonTestURL = 'test.horizon.url';
  const stellarNetworkProductionPassphrase = 'Stellar Production Passphrase';
  const stellarNetworkTestPassphrase = 'Stellar Test Passphrase';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NetworkEnvironmentService,
        {provide: CUSTOM_HORIZON_PRODUCTION_URL, useValue: mockCustomHorizonProductionURL},
        {provide: CUSTOM_HORIZON_TEST_URL, useValue: mockCustomHorizonTestURL},
        {provide: CUSTOM_NETWORK_PRODUCTION_PASSPHRASE, useValue: customNetworkProductionPassphrase},
        {provide: CUSTOM_NETWORK_TEST_PASSPHRASE, useValue: customNetworkTestPassphrase},
        {provide: STELLAR_HORIZON_PRODUCTION_URL, useValue: mockStellarHorizonProductionURL},
        {provide: STELLAR_HORIZON_TEST_URL, useValue: mockStellarHorizonTestURL},
        {provide: STELLAR_NETWORK_PRODUCTION_PASSPHRASE, useValue: stellarNetworkProductionPassphrase},
        {provide: STELLAR_NETWORK_TEST_PASSPHRASE, useValue: stellarNetworkTestPassphrase}
      ]
    });
  });

  beforeEach(inject([NetworkEnvironmentService], (s: NetworkEnvironmentService) => {
    service = s;
  }));

  describe('.horizonConfig / .setHorizonConfig', () => {
    describe('when setting the custom test environment', () => {
      beforeEach(() => {
        service.setConfig('customTest');
      });
      it('should have the proper url', () => {
        expect(service.horizonConfig.url).toBe(mockCustomHorizonTestURL);
      });
      it('should have friendbot enabled', () => {
        expect(service.horizonConfig.friendbotIsEnabled).toBe(true);
      });
      it('should have the networkPassphrase property', () => {
        expect(service.horizonConfig.networkPassphrase).toBe(customNetworkTestPassphrase);
      });
    });
    describe('when setting the custom production environment', () => {
      beforeEach(() => {
        service.setConfig('customProduction');
      });
      it('should have the proper url', () => {
        expect(service.horizonConfig.url).toBe(mockCustomHorizonProductionURL);
      });
      it('should have friendbot disabled', () => {
        expect(service.horizonConfig.friendbotIsEnabled).toBe(false);
      });
      it('should have the networkPassphrase property', () => {
        expect(service.horizonConfig.networkPassphrase).toBe(customNetworkProductionPassphrase);
      });
    });
    describe('when setting the Stellar test environment', () => {
      beforeEach(() => {
        service.setConfig('stellarTest');
      });
      it('should have the proper url', () => {
        expect(service.horizonConfig.url).toBe(mockStellarHorizonTestURL);
      });
      it('should have friendbot enabled', () => {
        expect(service.horizonConfig.friendbotIsEnabled).toBe(true);
      });
      it('should have the networkPassphrase property', () => {
        expect(service.horizonConfig.networkPassphrase).toBe(stellarNetworkTestPassphrase);
      });
    });
    describe('when setting the Stellar production environment', () => {
      beforeEach(() => {
        service.setConfig('stellarProduction');
      });
      it('should have the proper url', () => {
        expect(service.horizonConfig.url).toBe(mockStellarHorizonProductionURL);
      });
      it('should have friendbot disabled', () => {
        expect(service.horizonConfig.friendbotIsEnabled).toBe(false);
      });
      it('should have the networkPassphrase property', () => {
        expect(service.horizonConfig.networkPassphrase).toBe(stellarNetworkProductionPassphrase);
      });
    });
  });
});
