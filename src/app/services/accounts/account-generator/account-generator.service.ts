const stellarBaseSDK = require('stellar-base');
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AccountGeneratorService {

  constructor() {
    console.log(this, 'hi', stellarBaseSDK);
  }

  public generateAccount(): any {
    const keypair = stellarBaseSDK.Keypair.random();
    return {
      secret: keypair.secret(),
      publicKey: keypair.publicKey()
    };
  }

}
