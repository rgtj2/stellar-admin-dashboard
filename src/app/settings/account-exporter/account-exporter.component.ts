import { StellarAccountKeypair } from './../../shared/models/stellar-account/stellar-account-keypair';
import { AccountFileDownloadService } from './../../services/auth/account-file/account-file-download.service';
import { AppStateService } from './../../services/app-state/app-state.service';
import { NetworkEnvironmentService } from './../../services/network-environment/network-environment.service';
import { Component, OnInit, Input } from '@angular/core';
import { HorizonNetworkServer } from '../../services/network-environment/network-environment.service';
import { AccountFile } from '../../services/auth/account-file/account-file';
import { AccountMaster } from '../../services/auth/account-master';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private networkEnvironment: NetworkEnvironmentService,
              private accountFileDownloader: AccountFileDownloadService,
              private formBuilder: FormBuilder,
              private appState: AppStateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      secret: [null, Validators.required]
    });
  }

  public downloadAccountFile(): void {
    const accountMaster = this.appState.userState.value;
    if (accountMaster === 'none') {
      this.appState.authState.next('unauthorized');
    } else if (this.form.controls.secret.valid) {
      this.accountFileDownloader.downloadEncryptedFile(this.form.value.secret, accountMaster);
    }
    // TODO: AccountFile Creator
    // const networkConfig = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
    // const testAccountFile = new AccountFile(
    //   [{
    //     alias: 'test',
    //     networkConfig: {
    //       url: networkConfig.url,
    //       passphrase: networkConfig.networkPassphrase
    //     },
    //     stellarAccountConfig: keypair,
    //     twoFactorConfig: null
    //   }], 'test'
    // );
  }

}
