import { AccountMaster, AccountMasterStellarConfig } from './../account-master';
import { HorizonNetworkServer } from './../../network-environment/network-environment.service';
import { AccountFile, RawAccountFile } from '../account-file/account-file';
import { AccountFileLoaderService } from './../account-file/account-file-loader.service';
import { AccountFileReaderService } from '../account-file/account-file-reader.service';
import { TwoFactorService } from './../two-factor/two-factor.service';

import { Injectable } from '@angular/core';
import { StellarAccountKeypair } from '../../../shared/models/stellar-account/stellar-account-keypair';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

// TODO: Improve errors
type LoginError = 'Unauthorized' | 'InvalidConfig';

@Injectable()
export class LoginService {

  constructor(private accountFileLoader: AccountFileLoaderService,
              private accountFileReader: AccountFileReaderService,
              private twoFactor: TwoFactorService) { }

  loginWithStellarKeypair(accountAlias: string,
                          keypair: StellarAccountKeypair,
                          network: HorizonNetworkServer): Observable<AccountMasterStellarConfig|'InvalidAccount'> {
    // TODO: Validate keypair + network
    return Observable.of(new AccountMasterStellarConfig(accountAlias, keypair, network, null));
  }

  loginWithFileAndPassword(rawAccountFile: RawAccountFile,
                           accountFilePassword: string,
                           accountAlias: string,
                           network: HorizonNetworkServer): Observable<AccountMaster|LoginError> {
    console.log(rawAccountFile);
    return this.accountFileLoader.loadFile(accountFilePassword, rawAccountFile).pipe(
      switchMap((accountFile: AccountFile) => {
        console.log(accountFile);
        return this.authorize(accountFile, accountFilePassword, accountAlias, network);
      })
    );
  }

  private authorize(accountFile: AccountFile,
                    accountFilePassword: string,
                    accountAlias: string,
                    network: HorizonNetworkServer): Observable<AccountMaster|LoginError> {
    // Ensure account file password is valid
    if (accountFile.accountFilePassword !== accountFilePassword) {
      return Observable.of(<LoginError>'Unauthorized');
    }
    // Find target account on AccountFile for given network / alias
    const targetAccount = accountFile.stellarAccounts.find(a => a.alias === accountAlias);
    if (!targetAccount) {
      return Observable.of(<LoginError>'InvalidConfig');
    }

    if (targetAccount.twoFactorConfig && targetAccount.twoFactorConfig.enabled) {
      this.twoFactor.authorize(accountFile).pipe(
        map((authorized: boolean) => {
          return authorized ? this.formatAccountMaster(accountFile) : 'Unauthorized';
        })
      );
    } else {
      return Observable.of(this.formatAccountMaster(accountFile));
    }
  }

  private formatAccountMaster(accountFile: AccountFile): AccountMaster {
    return new AccountMaster(accountFile);
  }

}
