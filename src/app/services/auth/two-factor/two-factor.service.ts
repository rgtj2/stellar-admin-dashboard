import { Injectable } from '@angular/core';
import { AccountFile } from '../account-file/account-file';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TwoFactorService {
  public enabled: boolean;

  constructor() {
    this.enabled = false;
  }

  authorize(accountFile: AccountFile): Observable<boolean> {
    return Observable.of(true);
  }

}
