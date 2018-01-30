import { HorizonApiService } from './../horizon-api/horizon-api.service';
import { StellarAccountData } from './../../shared/models/stellar-account/stellar-account-data';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StellarAccountService {

  constructor(private horizonApi: HorizonApiService) { }

  byKey(publicKey: string): Observable<StellarAccountData> {
    // TODO: Validate shape of publicKey
    return this.horizonApi.get(`/accounts/${publicKey}`);
  }

}
