import { InjectionToken } from '@angular/core';

export const HORIZON_PRODUCTION_URL = new InjectionToken<string>('HORIZON_PRODUCTION_URL');
export const HORIZON_TEST_URL = new InjectionToken<string>('HORIZON_TEST_URL');
export const NETWORK_IS_PERSISTENT = new InjectionToken<boolean>('NETWORK_IS_PERSISTENT');
