import { HorizonApiService } from './../horizon-api/horizon-api.service';
import { StellarAccountData } from './../../shared/models/stellar-account/stellar-account-data';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class StellarAccountService {

  constructor(private horizonApi: HorizonApiService) { }

  byKey(publicKey: string): Observable<StellarAccountData> {
    // TODO: Validate shape of publicKey
    // TODO: Error handling
    return this.horizonApi.get(`/accounts/${publicKey}`).pipe(
      map((r) => {
        return StellarAccountData.fromResult(r);
      })
    );
  }

}
