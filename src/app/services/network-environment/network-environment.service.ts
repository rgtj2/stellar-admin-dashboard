import { PRODUCTION_HORIZON_URL, TEST_HORIZON_URL } from './../injection-tokens';
import { Injectable, Inject } from '@angular/core';

type HorizonNetworkEnvironment = 'test' | 'production';

@Injectable()
export class NetworkEnvironmentService {
  private _horizonURL: string;

  constructor(@Inject(PRODUCTION_HORIZON_URL) private readonly productionHorizonURL: string,
              @Inject(TEST_HORIZON_URL) private readonly testHorizonURL: string) { }

  public get horizonURL(): string {
    return this._horizonURL;
  }

  // TODO: Use a setter here, update jasmine, and test with .spyOnProperty
  public setHorizonURL(env: HorizonNetworkEnvironment): void {
    this._horizonURL = env === 'production' ? this.productionHorizonURL : this.testHorizonURL;
  }

}
