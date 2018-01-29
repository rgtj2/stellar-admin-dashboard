import { HORIZON_PRODUCTION_URL, HORIZON_TEST_URL, NETWORK_IS_PERSISTENT, FRIENDBOT_IS_ENABLED } from './../injection-tokens';
import { Injectable, Inject } from '@angular/core';

type HorizonNetworkEnvironment = 'test' | 'production';

@Injectable()
export class NetworkEnvironmentService {
  private _horizonURL: string;

  constructor(@Inject(FRIENDBOT_IS_ENABLED) public readonly friendbotIsEnabled: boolean,
              @Inject(HORIZON_PRODUCTION_URL) private readonly horizonProductionURL: string,
              @Inject(HORIZON_TEST_URL) private readonly horizonTestURL: string,
              @Inject(NETWORK_IS_PERSISTENT) public readonly isPersistent: boolean) { }

  public get horizonURL(): string {
    return this._horizonURL;
  }

  // TODO: Use a setter here, update jasmine, and test with .spyOnProperty
  public setHorizonURL(env: HorizonNetworkEnvironment): void {
    this._horizonURL = env === 'production' ? this.horizonProductionURL : this.horizonTestURL;
  }

}
