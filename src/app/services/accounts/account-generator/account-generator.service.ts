import { Account } from '../../../shared/models/account';
import { StellarBaseSdkService } from '../../stellar-sdk/stellar-base-sdk.service';

import { Injectable } from '@angular/core';

@Injectable()
export class AccountGeneratorService {

  constructor(private baseSDK: StellarBaseSdkService) {
  }

  public generateAccount(): Account {
    // TODO: Explore other ways to generate accounts
    const keypair = this.baseSDK.base.Keypair.random();
    return new Account(keypair.publicKey(), keypair.secret());
  }

}
