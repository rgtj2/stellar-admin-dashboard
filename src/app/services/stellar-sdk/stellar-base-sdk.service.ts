import { Injectable } from '@angular/core';
const stellarBaseSDK = require('stellar-base');

@Injectable()
export class StellarBaseSdkService {
  public base: any; // TODO: Types

  constructor() {
    this.base = stellarBaseSDK;
  }

}
