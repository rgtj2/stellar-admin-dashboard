import { AccountFile, RawAccountFile, DecryptedAccountFile } from './account-file';
import { FileReaderReferenceService } from '../../js-reference/file-reader-reference.service';
import { JSCryptoService } from './../../js-crypto/js-crypto.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

interface ParsedDecryptedAccountFile {
  accountFile: DecryptedAccountFile;
}

@Injectable()
export class AccountFileReaderService {

  constructor(private fileReader: FileReaderReferenceService,
              private crypto: JSCryptoService) { }


  readRawFile(password: string, rawFile: RawAccountFile): Observable<AccountFile|'FileReadError'> {
    return this.fileReader.parseFileText(rawFile).pipe(
      map((ciphertext: string|'FileReadError') => {
        if (ciphertext === 'FileReadError') { return ciphertext; }
        const obj = this.decryptFileText(password, ciphertext);
        return new AccountFile(obj.accountFile.stellarAccounts, obj.accountFile.accountFilePassword);
      })
    );
  }

  private decryptFileText(password: string, ciphertext: string): ParsedDecryptedAccountFile {
    return this.crypto.decryptJSON(password, ciphertext) as ParsedDecryptedAccountFile;
  }

}
