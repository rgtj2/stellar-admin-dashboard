import { StellarAccountKeypair } from './../../shared/models/stellar-account/stellar-account-keypair';
import { AccountFileDownloadService } from './../../services/auth/account-file/account-file-download.service';
import { AppStateService } from './../../services/app-state/app-state.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface AccountExportConfig {
  stellarKeypair: StellarAccountKeypair;
  // TODO: Kill this ^^^
  accountPassword: string;
}

@Component({
  selector: 'app-account-exporter',
  templateUrl: './account-exporter.component.html',
  styleUrls: ['./account-exporter.component.css']
})
export class AccountExporterComponent implements OnInit {
  public form: FormGroup;

  constructor(private accountFileDownloader: AccountFileDownloadService,
              private formBuilder: FormBuilder,
              private appState: AppStateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      secret: [null, Validators.required]
    });
  }

  public downloadAccountFile({value, valid}): void {
    const accountMaster = this.appState.userState.value;
    if (accountMaster === 'none') {
      this.appState.authState.next('unauthorized');
    } else if (valid) {
      this.accountFileDownloader.downloadEncryptedFile(value.secret, accountMaster);
    }
  }

}
