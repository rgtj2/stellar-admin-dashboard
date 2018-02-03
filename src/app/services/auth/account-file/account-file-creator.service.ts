import { DecryptedAccountFile } from './account-file';
import { AccountMaster } from './../account-master';
import { Injectable } from '@angular/core';
import { JSCryptoService } from '../../js-crypto/js-crypto.service';

@Injectable()
export class AccountFileCreatorService {

  constructor(private crypto: JSCryptoService) { }

  public encryptAccountMaster(accountPassword: string, accountMaster: AccountMaster): string {
    const decrypted = this.formatDecryptedFile(accountPassword, accountMaster);
    console.log(decrypted);
    const test = this.crypto.encryptJSON(accountPassword, accountMaster);
    console.log('encrypted', test);
    return test;
  }

  private formatDecryptedFile(password: string, master: AccountMaster): DecryptedAccountFile {
    // TODO: validate invariant
    const decrypted: DecryptedAccountFile = {
      accountFilePassword: password,
      stellarAccounts: master.accountFile.stellarAccounts.map((a) => {
        return {
          alias: a.alias,
          networkConfig: {
            url: a.networkConfig.url,
            passphrase: a.networkConfig.passphrase
          },
          stellarAccountConfig: a.stellarAccountConfig,
          twoFactorConfig: a.twoFactorConfig
        };
      })
    };
    return decrypted;
  }

}
