
import { HorizonNetworkServer } from './../network-environment/network-environment.service';
import { StellarAccountKeypair } from './../../shared/models/stellar-account/stellar-account-keypair';
import { AccountFile, AccountFileAccountMasterConfig } from './account-file/account-file';
import { TwoFactorConfig } from './two-factor/two-factor-config';

export class AccountMaster {
  constructor(public readonly accountFile: AccountFile) {}

  public accountFileMasterConfigForStellarPublicKey(key: string): AccountFileAccountMasterConfig|null {
    return this.accountFile.stellarAccounts.find(a => a.stellarAccountConfig.publicKey === key);
  }

}

export class AccountMasterStellarConfig {
  constructor(public readonly alias: string,
              public readonly stellarAccount: StellarAccountKeypair,
              public readonly stellarNetwork: HorizonNetworkServer,
              public readonly twoFactorConfig: TwoFactorConfig) {}
}
