
import { Injectable } from '@angular/core';
import { StellarBaseSdkService } from '../../stellar-sdk/stellar-base-sdk.service';

@Injectable()
export class AccountGeneratorService {

  constructor(private baseSDK: StellarBaseSdkService) {
  }

  public generateAccount(): any {
    const keypair = this.baseSDK.base.Keypair.random();
    return {
      secret: keypair.secret(),
      publicKey: keypair.publicKey()
    };
  }

}
