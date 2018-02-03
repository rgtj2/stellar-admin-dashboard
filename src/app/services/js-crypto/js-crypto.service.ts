import { Injectable } from '@angular/core';
import * as sjcl from 'sjcl';

interface EncryptParams {
  // iterations (key derivation)
  iter: number;
  iv?: string;
  // key size
  ks: number;
  salt?: string;
  tag?: string;
}

@Injectable()
export class JSCryptoService {

  encryptJSON(password: string, object: {}): string {
    return sjcl.encrypt(password, JSON.stringify(object), this.defaultParams);
  }

  decryptJSON(password: string, ciphertext: string): {} {
    const decrypted = sjcl.decrypt(password, ciphertext, this.defaultParams);
    return JSON.parse(decrypted);
  }

  private get defaultParams(): EncryptParams {
    return {
      iter: 1000,
      ks: 256
    };
  }

}
