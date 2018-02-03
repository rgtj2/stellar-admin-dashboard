import { AccountFileCreatorService } from './account-file-creator.service';
import { AccountMaster } from './../account-master';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable()
export class AccountFileDownloadService {

  constructor(private accountFileCreator: AccountFileCreatorService) { }

  downloadEncryptedFile(password: string, accountMaster: AccountMaster): Blob {
    const encrypted = this.accountFileCreator.encryptAccountMaster(password, accountMaster);
    const blob = new Blob([encrypted], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, `samaf-${new Date().toISOString()}.txt`);
    return blob;
  }

}
