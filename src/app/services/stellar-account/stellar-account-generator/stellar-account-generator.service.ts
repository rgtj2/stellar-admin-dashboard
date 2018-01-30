import { StellarAccountKeypair } from '../../../shared/models/stellar-account/stellar-account-keypair';
import { StellarBaseSdkService } from '../../stellar-sdk/stellar-base-sdk.service';

import { Injectable } from '@angular/core';

@Injectable()
export class StellarAccountGeneratorService {

  constructor(private baseSDK: StellarBaseSdkService) {}

  public generateKeypair(): StellarAccountKeypair {
    // TODO: Explore other ways to generate keys
    const keypair = this.baseSDK.base.Keypair.random();
    return new StellarAccountKeypair(keypair.publicKey(), keypair.secret());
  }

}
