import { HorizonNetworkConfig, HorizonNetworkAlias } from './network-environment.service';
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
import { HorizonServer } from '../../shared/models/horizon-server/horizon-server';

export type HorizonNetworkAlias = 'customTest' | 'customProduction' | 'stellarTest' | 'stellarProduction';
export type HorizonNetworkServer = HorizonProductionServer | HorizonTestServer;
export type HorizonNetworkConfig = HorizonNetworkServer | 'NetworkConfigError';

@Injectable()
export class NetworkEnvironmentService {
  private _currentHorizonConfig: HorizonNetworkConfig;

  constructor(@Inject(CUSTOM_HORIZON_PRODUCTION_URL) private readonly customHorizonProductionURL: string,
              @Inject(CUSTOM_HORIZON_TEST_URL) private readonly customHorizonTestURL: string,
              @Inject(CUSTOM_NETWORK_PRODUCTION_PASSPHRASE) private readonly customNetworkProductionPassphrase: string,
              @Inject(CUSTOM_NETWORK_TEST_PASSPHRASE) private readonly customNetworkTestPassphrase: string,
              @Inject(STELLAR_HORIZON_PRODUCTION_URL) private readonly stellarHorizonProductionURL: string,
              @Inject(STELLAR_HORIZON_TEST_URL) private readonly stellarHorizonTestURL: string,
              @Inject(STELLAR_NETWORK_PRODUCTION_PASSPHRASE) private readonly stellarNetworkProductionPassphrase: string,
              @Inject(STELLAR_NETWORK_TEST_PASSPHRASE) private readonly stellarNetworkTestPassphrase: string) {
  }

  public get horizonConfig(): HorizonNetworkConfig {
    return this._currentHorizonConfig;
  }

  public enviornmentConfigForAlias(alias: HorizonNetworkAlias): HorizonNetworkConfig {
    return this.environmentByAliasHash[alias];
  }

  public setConfigByAlias(alias: HorizonNetworkAlias): HorizonNetworkConfig {
    const config = this.environmentByAliasHash[alias];
    this._currentHorizonConfig = config ? config : 'NetworkConfigError';
    return this._currentHorizonConfig;
  }

  // public setConfigByPassphrase(passphrase: string): HorizonNetworkConfig {
  //   const hash = this.environmentByAliasHash;
  //   const knownConfigs: HorizonServer[] = Object.keys(hash).reduce((p, c) => p.concat(hash[c]), []);
  //   const forPassphrase = knownConfigs.find((c) => c.networkPassphrase === passphrase);
  //   console.log('forPassphrase', forPassphrase);
  //   this._currentHorizonConfig = forPassphrase ? forPassphrase : 'NetworkConfigError';
  //   return this._currentHorizonConfig;
  // }

  private get environmentByAliasHash(): {[alias: string]: HorizonNetworkConfig } {
    return {
      'customProduction': this.customHorizonProductionServer,
      'customTest': this.customHorizonTestServer,
      'stellarProduction': this.stellarHorizonProductionServer,
      'stellarTest': this.stellarHorizonTestServer
    };
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
