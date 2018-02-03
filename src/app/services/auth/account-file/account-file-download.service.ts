import { AccountFileCreatorService } from './account-file-creator.service';
import { AccountMaster } from './../account-master';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable()
export class AccountFileDownloadService {

  constructor(private accountFileCreator: AccountFileCreatorService) { }

  downloadEncryptedFile(password: string, accountMaster: AccountMaster, skipDownload: boolean = false): Blob {
    const encryptedBlob = this.accountFileCreator.encryptAccountMasterFile(password, accountMaster);
    if (skipDownload) { return encryptedBlob; }
    FileSaver.saveAs(encryptedBlob, `samaf-${new Date().toISOString()}.txt`);
    return encryptedBlob;
  }

}
