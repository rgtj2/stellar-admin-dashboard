import { StellarAccountData } from '../../../shared/models/stellar-account/stellar-account-data';
import { StellarAccountService } from '../../../services/stellar-account/stellar-account.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class StellarAccountDataResolveService implements Resolve<StellarAccountData> {

  constructor(private accountService: StellarAccountService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<StellarAccountData> {
    const publicKey = route.paramMap.get('publicKey');
    // TODO: Validate shape of public key + handle errors
    return this.accountService.byKey(publicKey);
  }

}
