export module StellarHorizonBackend {

  export interface AccountData {
    account_id: string;
    signers: AccountSigner[];
    balances: any;
  }

  export interface AccountSigner {
    public_key: string;
    weight: number;
  }
}
