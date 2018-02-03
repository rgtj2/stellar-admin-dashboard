import { HorizonNetworkConfig } from './network-environment.service';
import { HorizonApiService } from './../horizon-api/horizon-api.service';
import { HorizonProductionServer } from './../../shared/models/horizon-server/horizon-production-server';
import { HorizonTestServer } from './../../shared/models/horizon-server/horizon-test-server';
import {
  CUSTOM_HORIZON_PRODUCTION_URL,
  CUSTOM_HORIZON_TEST_URL,
  CUSTOM_NETWORK_PRODUCTION_PASSPHRASE,
  CUSTOM_NETWORK_TEST_PASSPHRASE,
  STELLAR_HORIZON_PRODUCTION_URL,
  STELLAR_HORIZON_TEST_URL,
  STELLAR_NETWORK_PRODUCTION_PASSPHRASE,
  STELLAR_NETWORK_TEST_PASSPHRASE,
} from './../injection-tokens';

import { Injectable, Inject } from '@angular/core';
import { StellarBaseSdkService } from '../stellar-sdk/stellar-base-sdk.service';
import { Subject } from 'rxjs/Subject';

export type HorizonNetworkAlias = 'customTest' | 'customProduction' | 'stellarTest' | 'stellarProduction';
export type HorizonNetworkServer = HorizonProductionServer | HorizonTestServer;
export type HorizonNetworkConfig = HorizonNetworkServer | 'NetworkConfigError';

@Injectable()
export class NetworkEnvironmentService {
  private _currentHorizonConfig: HorizonNetworkConfig;
  private _testConfig: HorizonTestServer;
  public onNetworkChange: Subject<HorizonNetworkConfig>;

  constructor(@Inject(CUSTOM_HORIZON_PRODUCTION_URL) private readonly customHorizonProductionURL: string,
              @Inject(CUSTOM_HORIZON_TEST_URL) private readonly customHorizonTestURL: string,
              @Inject(CUSTOM_NETWORK_PRODUCTION_PASSPHRASE) private readonly customNetworkProductionPassphrase: string,
              @Inject(CUSTOM_NETWORK_TEST_PASSPHRASE) private readonly customNetworkTestPassphrase: string,
              @Inject(STELLAR_HORIZON_PRODUCTION_URL) private readonly stellarHorizonProductionURL: string,
              @Inject(STELLAR_HORIZON_TEST_URL) private readonly stellarHorizonTestURL: string,
              @Inject(STELLAR_NETWORK_PRODUCTION_PASSPHRASE) private readonly stellarNetworkProductionPassphrase: string,
              @Inject(STELLAR_NETWORK_TEST_PASSPHRASE) private readonly stellarNetworkTestPassphrase: string) {
    this.onNetworkChange = new Subject();
  }

  public get horizonConfig(): HorizonNetworkConfig {
    return this._currentHorizonConfig;
  }

  // TODO: Use a setter here, update jasmine, and test with .spyOnProperty
  public setConfig(env: HorizonNetworkAlias): void {
    if (env === 'customProduction') {
      this._currentHorizonConfig = this.customHorizonProductionServer;
    } else if (env === 'customTest') {
      this._currentHorizonConfig = this.customHorizonTestServer;
    } else if (env === 'stellarProduction') {
      this._currentHorizonConfig = this.stellarHorizonProductionServer;
    } else if (env === 'stellarTest') {
      this._currentHorizonConfig = this.stellarHorizonTestServer;
    } else {
      console.warn(`Network Configuration for environnment alias '${env}' is undefined`);
      this._currentHorizonConfig = 'NetworkConfigError';
    }
    this.onNetworkChange.next(this._currentHorizonConfig);
  }

  private get customHorizonProductionServer(): HorizonProductionServer {
    return new HorizonProductionServer(this.customHorizonProductionURL, this.customNetworkProductionPassphrase);
  }

  private get customHorizonTestServer(): HorizonTestServer {
    return new HorizonTestServer(this.customHorizonTestURL, this.customNetworkTestPassphrase);
  }

  private get stellarHorizonProductionServer(): HorizonProductionServer {
    return new HorizonProductionServer(this.stellarHorizonProductionURL, this.stellarNetworkProductionPassphrase);
  }

  private get stellarHorizonTestServer(): HorizonTestServer {
    return new HorizonTestServer(this.stellarHorizonTestURL, this.stellarNetworkTestPassphrase);
  }
}
