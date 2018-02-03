import { AccountFile, RawAccountFile } from './account-file';
import { AccountFileReaderService } from './account-file-reader.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';


@Injectable()
export class AccountFileLoaderService {

  constructor(private accountFileReader: AccountFileReaderService) { }

  public loadFile(password: string, rawFile: RawAccountFile): Observable<AccountFile|'FileReadError'> {
    return this.accountFileReader.readRawFile(password, rawFile);
  }

}
