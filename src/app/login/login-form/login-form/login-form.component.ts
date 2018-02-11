import { AccountFile, AccountFileAccountMasterConfig } from './../../../services/auth/account-file/account-file';
import { HorizonTestServer } from './../../../shared/models/horizon-server/horizon-test-server';
import { HorizonProductionServer } from './../../../shared/models/horizon-server/horizon-production-server';
import { AccountMaster } from '../../../services/auth/account-master';
import { AppStateService } from './../../../services/app-state/app-state.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../../services/auth/login/login.service';
import { NetworkEnvironmentService, HorizonNetworkServer } from './../../../services/network-environment/network-environment.service';
import {
  StellarAccountGeneratorService
} from '../../../services/stellar-account/stellar-account-generator/stellar-account-generator.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

interface ValidFileLoginForm {
  accountAlias: string;
  accountFilePassword: string;
  rawAccountFile: File;
}

interface ValidNewStellarLoginForm {
  accountAlias: string;
  accountFilePassword: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public fileLoginForm: FormGroup;
  public newStellarForm: FormGroup;
  public loginMethod: 'accountFile' | 'stellarKeypair';
  private fileReadUpdates: Subscription;
  @ViewChild('fileSubmit') private fileFormSubmitButton;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private appState: AppStateService,
              private stellarAccountGenerator: StellarAccountGeneratorService,
              private networkEnvironment: NetworkEnvironmentService,
              private router: Router) { }

  ngOnInit() {
    console.log(this.formBuilder, this);
    this.loginMethod = 'accountFile';
    this.fileReadUpdates = null;

    this.fileLoginForm = this.formBuilder.group({
      accountAlias: [null, Validators.required],
      accountFilePassword: [null, Validators.required],
      rawAccountFile: [null, Validators.required]
    });

    this.newStellarForm = this.formBuilder.group({
      accountAlias: [null, Validators.required],
      accountFilePassword: [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.resetFileReadUpdates();
  }

  public onFileSelect($event): void {
    const blob = $event.srcElement.files[0];
    this.fileLoginForm.patchValue({rawAccountFile: blob});
    this.fileFormSubmitButton.nativeElement.focus();
  }

  submitFileForm({value, valid}): void {
    if (valid) {
      const values: ValidFileLoginForm = value;
      this.readAccountMasterFile(values.accountAlias, values.rawAccountFile, values.accountFilePassword);
    }
  }

  submitNewStellarForm({value, valid}): void {
    if (valid && this.networkEnvironment.horizonConfig !== 'NetworkConfigError') {
      const values: ValidNewStellarLoginForm = value;
      const stellarKeypair = this.stellarAccountGenerator.generateKeypair();
      const network = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
      this.loginService.loginWithStellarKeypair(values.accountAlias, stellarKeypair, network)
        .subscribe((r) => {
          if (r !== 'InvalidAccount') {
            // TODO: Move this out
            const accountConfig: AccountFileAccountMasterConfig = {
              stellarAccountConfig: {publicKey: r.stellarAccount.publicKey, secret: r.stellarAccount.secret},
              networkConfig: {url: network.url, passphrase: network.networkPassphrase},
              alias: values.accountAlias,
              twoFactorConfig: null
            };
            const account = new AccountFile([accountConfig], values.accountFilePassword);
            const master = new AccountMaster(account);
            this.appState.userState.next(master);
            this.router.navigate(['/']);
          }
        });
    }
  }

  private resetFileReadUpdates(): void {
    if (this.fileReadUpdates !== null) {
      this.fileReadUpdates.unsubscribe();
    }
    this.fileReadUpdates = null;
  }

  private readAccountMasterFile(accountAlias: string,
                                accountFile: File,
                                accountFilePassword: string): void {
    this.resetFileReadUpdates();
    this.fileReadUpdates = this.loginService.loginWithFileAndPassword(accountAlias, accountFilePassword, accountFile)
      .subscribe((v) => {
        if (v instanceof AccountMaster) {
          // TODO: Move this out
          const accountPublicKey = v.accountFile.stellarAccounts[0].stellarAccountConfig.publicKey;
          this.appState.userState.next(v);
          this.appState.authState.next('authorized');
          this.router.navigate(['/']);
        }
      });
  }
}
