import { Injectable } from '@angular/core';
import * as StellarBase from 'stellar-base';

@Injectable()
export class StellarBaseSdkService {
  public base: any; // TODO: Types

  constructor() {
    this.base = StellarBase;
  }
}
