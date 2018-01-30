import { HorizonApiService } from '../horizon-api.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendbotService {

  constructor(private horizonApi: HorizonApiService) { }

  public requestFunds(accountPublicKey: string): Observable<any> {
    return this.horizonApi.post(`/friendbot/?addr=${accountPublicKey}`);
  }

}
