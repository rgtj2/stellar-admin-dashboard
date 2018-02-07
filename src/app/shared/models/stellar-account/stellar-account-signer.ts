import { StellarHorizonBackend } from './backend';

export class StellarAccountSigner {
  constructor(public publicKey: string,
              public weight: number) {}

  static fromResult(backend: StellarHorizonBackend.AccountSigner): StellarAccountSigner {
    return new StellarAccountSigner(backend.public_key, backend.weight);
  }
}

