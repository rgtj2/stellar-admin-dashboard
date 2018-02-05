import { HorizonTestServer } from './../../../shared/models/horizon-server/horizon-test-server';
import { HorizonProductionServer } from './../../../shared/models/horizon-server/horizon-production-server';
import { AccountMaster } from '../../../services/auth/account-master';
import { AppStateService } from './../../../services/app-state/app-state.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../../services/auth/login/login.service';
import { NetworkEnvironmentService, HorizonNetworkServer } from './../../../services/network-environment/network-environment.service';
import {
  StellarAccountGeneratorService
} from '../../../services/stellar-account/stellar-account-generator/stellar-account-generator.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

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

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private appState: AppStateService,
              private stellarAccountGenerator: StellarAccountGeneratorService,
              private networkEnvironment: NetworkEnvironmentService,
              private router: Router) { }

  ngOnInit() {
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
  }

  submitFileForm(): void {
    console.log(this.fileLoginForm);
    if (this.fileLoginForm.valid) {
      const values: ValidFileLoginForm = this.fileLoginForm.value;
      console.log(values);
      this.readAccountMasterFile(values.accountAlias, values.rawAccountFile, values.accountFilePassword);
    }
  }

  submitNewStellarForm(): void {
    if (this.newStellarForm.valid && this.networkEnvironment.horizonConfig !== 'NetworkConfigError') {
      const values: ValidNewStellarLoginForm = this.newStellarForm.value;
      const stellarKeypair = this.stellarAccountGenerator.generateKeypair();
      const network = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
      this.loginService.loginWithStellarKeypair(values.accountAlias, stellarKeypair, network);
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
        console.log(v);
        if (v instanceof AccountMaster) {
          const accountPublicKey = v.accountFile.stellarAccounts[0].stellarAccountConfig.publicKey;
          console.log('logged in!');
          this.appState.userState.next(v);
          this.appState.authState.next('authorized');
          this.router.navigate(['/admin']);
        }
      });
  }
}
