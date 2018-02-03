export class AccountFile {
  constructor(public readonly stellarAccounts: AccountFileAccountMasterConfig[],
              public readonly accountFilePassword: string) {
  }
}

export interface DecryptedAccountFile {
  stellarAccounts: AccountFileAccountMasterConfig[];
  accountFilePassword: string;
}

export type RawAccountFile = Blob;

export interface AccountFileAccountMasterConfig {
  readonly alias: string;
  readonly networkConfig: AccountFileHorizonNetworkConfig;
  readonly stellarAccountConfig: AccountFileStellarAccountConfig;
  readonly twoFactorConfig: AccountFileTwoFactorConfig;
}

export interface AccountFileHorizonNetworkConfig {
  readonly url: string;
  readonly passphrase: string;
}

export interface AccountFileStellarAccountConfig {
  readonly publicKey: string;
  readonly secret: string;
}

export interface AccountFileTwoFactorConfig {
  provider: string;
  method: string;
  targetAddress: string;
  enabled: boolean;
}
