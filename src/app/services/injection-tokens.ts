import { InjectionToken } from '@angular/core';

export const CUSTOM_HORIZON_PRODUCTION_URL = new InjectionToken<string>('CUSTOM_HORIZON_PRODUCTION_URL');
export const CUSTOM_HORIZON_TEST_URL = new InjectionToken<string>('CUSTOM_HORIZON_TEST_URL');
export const CUSTOM_NETWORK_PRODUCTION_PASSPHRASE = new InjectionToken<string>('CUSTOM_NETWORK_PRODUCTION_PASSPHRASE');
export const CUSTOM_NETWORK_TEST_PASSPHRASE = new InjectionToken<string>('CUSTOM_NETWORK_TEST_PASSPHRASE');
export const STELLAR_HORIZON_PRODUCTION_URL = new InjectionToken<string>('STELLAR_HORIZON_PRODUCTION_URL');
export const STELLAR_HORIZON_TEST_URL = new InjectionToken<string>('STELLAR_HORIZON_TEST_URL');
export const STELLAR_NETWORK_PRODUCTION_PASSPHRASE = new InjectionToken<string>('CUSTOM_NETWORK_PRODUCTION_PASSPHRASE');
export const STELLAR_NETWORK_TEST_PASSPHRASE = new InjectionToken<string>('CUSTOM_NETWORK_TEST_PASSPHRASE');

