import { StellarAccountSigner } from './stellar-account-signer';
import { StellarHorizonBackend } from './backend';

// TODO: Backend types
export class StellarAccountData {
  constructor(public accountId: string,
              public balances: any,
              public signers: StellarAccountSigner[]) {}

  static fromResult(backend: StellarHorizonBackend.AccountData): StellarAccountData {
    return new StellarAccountData(
      backend.account_id,
      backend.balances,
      backend.signers.map(s => StellarAccountSigner.fromResult(s))
    );
  }
}
