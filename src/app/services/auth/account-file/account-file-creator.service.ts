import { DecryptedAccountFile } from './account-file';
import { AccountMaster } from './../account-master';
import { Injectable } from '@angular/core';
import { JSCryptoService } from '../../js-crypto/js-crypto.service';

@Injectable()
export class AccountFileCreatorService {

  constructor(private crypto: JSCryptoService) { }

  public encryptAccountMasterFile(accountPassword: string, accountMaster: AccountMaster): Blob {
    const decrypted = this.formatDecryptedFile(accountPassword, accountMaster);
    const encrypted = this.crypto.encryptJSON(accountPassword, accountMaster);
    const blob = new Blob([encrypted], {type: 'text/plain;charset=utf-8'});
    return blob;
  }

  private formatDecryptedFile(password: string, master: AccountMaster): DecryptedAccountFile {
    // TODO: validate invariant + move this outta here
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
