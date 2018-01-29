import { HorizonProductionServer } from '../../shared/models/horizon-server/horizon-production-server';
import { HorizonTestServer } from './../../shared/models/horizon-server/horizon-test-server';
import { HORIZON_PRODUCTION_URL, HORIZON_TEST_URL, NETWORK_IS_PERSISTENT } from './../injection-tokens';

import { Injectable, Inject } from '@angular/core';

type HorizonNetworkEnvironment = 'test' | 'production';
type HorizonNetworkConfig = HorizonProductionServer | HorizonTestServer;

@Injectable()
export class NetworkEnvironmentService {
  private _currentHorizonConfig: HorizonNetworkConfig;
  private _productionConfig: HorizonProductionServer;
  private _testConfig: HorizonTestServer;

  constructor(@Inject(HORIZON_PRODUCTION_URL) readonly horizonProductionURL: string,
              @Inject(HORIZON_TEST_URL) readonly horizonTestURL: string,
              @Inject(NETWORK_IS_PERSISTENT) readonly isPersistent: boolean) {

    this._productionConfig = new HorizonProductionServer(horizonProductionURL, isPersistent);
    this._testConfig = new HorizonTestServer(horizonTestURL, isPersistent);
  }

  public get horizonConfig(): HorizonNetworkConfig {
    return this._currentHorizonConfig;
  }

  // TODO: Use a setter here, update jasmine, and test with .spyOnProperty
  public setHorizonConfig(env: HorizonNetworkEnvironment): void {
    this._currentHorizonConfig = env === 'production' ? this._productionConfig : this._testConfig;
  }

}
