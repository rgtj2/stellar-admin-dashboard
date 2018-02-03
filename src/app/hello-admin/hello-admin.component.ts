import { LoginService } from './../services/auth/login/login.service';
import { AccountFileDownloadService } from './../services/auth/account-file/account-file-download.service';
import { AccountFile } from './../services/auth/account-file/account-file';
import { AccountMaster } from './../services/auth/account-master';
import { HorizonProductionServer } from './../shared/models/horizon-server/horizon-production-server';
import { HorizonTestServer } from './../shared/models/horizon-server/horizon-test-server';
import { FriendbotService } from '../services/horizon-api/friendbot/friendbot.service';
import { HorizonApiService } from '../services/horizon-api/horizon-api.service';
import {
  NetworkEnvironmentService,
  HorizonNetworkServer,
  HorizonNetworkConfig
} from './../services/network-environment/network-environment.service';
import { StellarAccountGeneratorService } from '../services/stellar-account/stellar-account-generator/stellar-account-generator.service';
import { StellarAccountKeypair } from './../shared/models/stellar-account/stellar-account-keypair';

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * HelloAdminComponent
 *
 * This component is in the spirit of a 'hello-world',
 * but moreso an intro and 'getting started' tool for developing on top of the Stellar network.
 */

@Component({
  selector: 'app-hello-admin',
  templateUrl: './hello-admin.component.html',
  styleUrls: ['./hello-admin.component.css']
})
export class HelloAdminComponent implements OnInit {
  public adminFundState: 'unfunded' | 'funded';
  public allowFriendbot: boolean;
  public authState: 'authorized' | 'unauthorized';
  public stellarKeypair: StellarAccountKeypair;
  public loadExistingAccount: boolean;
  public requestState: 'ready' | 'waiting' | 'complete' | 'error';
  public testEncryptedData: Blob;

  constructor(private friendbot: FriendbotService,
              private accountGenerator: StellarAccountGeneratorService,
              private networkEnvironment: NetworkEnvironmentService,
              private horizonApi: HorizonApiService,
              private accountFileDownloader: AccountFileDownloadService,
              private login: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.loadExistingAccount = true;
    this.allowFriendbot = false;
    this.authState = 'unauthorized';
    this.initializeAdminAccount();
    this.initializeNetworkStatus();
    this.networkEnvironment.onNetworkChange.subscribe((n) => {
      this.initializeNetworkStatus();
    });
  }

  // TODO: Move this out
  public downloadAccountMasterFile(): void {
    const networkConfig = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
    const testAccountFile = new AccountFile(
      [{
        alias: 'test',
        networkConfig: {
          url: networkConfig.url,
          passphrase: networkConfig.networkPassphrase
        },
        stellarAccountConfig: this.stellarKeypair,
        twoFactorConfig: null
      }], 'test'
    );
    const testAccountMaster: AccountMaster = new AccountMaster(testAccountFile);
    this.testEncryptedData = this.accountFileDownloader.downloadEncryptedFile('test', testAccountMaster);
  }

  // TODO: Move this out
  public onFileSelect($event): void {
    const blob = $event.srcElement.files[0];
    this.readAccountMasterFile(blob);
  }

  // TODO: Move this out
  private readAccountMasterFile(blob: File): void {
    const networkConfig = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
    this.login.loginWithFileAndPassword(blob, 'test', 'test', networkConfig)
      .subscribe((v) => {
        if (v instanceof AccountMaster) {
          const accountFile = v.accountFile;
          // TODO: Handle initializing w/ multiple accounts
          const stellarAccount = accountFile.stellarAccounts[0].stellarAccountConfig;
          // TODO: Only pass around encrypted keypairs..
          this.stellarKeypair = new StellarAccountKeypair(stellarAccount.publicKey, stellarAccount.secret);
          this.authState = 'authorized';
        } else {
          // TODO: Helpful error messages, etc
          this.authState = 'unauthorized';
        }
      }, (e) => {
        this.authState = 'unauthorized';
    });
  }

  // TODO: Move this out
  public fundAdminAccount(): void {
    this.requestState = 'waiting';
    this.friendbot.requestFunds(this.stellarKeypair.publicKey)
      .subscribe((r) => {
        // TODO: Move / improve Response Parsing
        this.requestState = 'complete';
        this.adminFundState = 'funded';
        // TODO: Move this somewhere else
        this.router.navigate(['accounts', this.stellarKeypair.publicKey]);
      }, () => {
        // TODO: Move / improve Error Handling
        this.requestState = 'error';
      });
  }

  // TODO: Move this out
  private initializeAdminAccount(): void {
    if (this.loadExistingAccount) {
      this.authState = 'unauthorized';
    } else {
      this.authState = 'authorized';
      this.stellarKeypair = this.accountGenerator.generateKeypair();
      this.adminFundState = 'unfunded';
    }
  }

  // TODO: Move this out
  private initializeNetworkStatus(): void {
    if (this.configIsValid(this.networkEnvironment.horizonConfig)) {
      this.checkNetworkStatus(this.networkEnvironment.horizonConfig);
    } else {
      this.requestState = 'error';
    }
  }

  // TODO: Move this out
  private configIsValid(config: HorizonNetworkConfig): config is HorizonNetworkServer {
    return (config instanceof HorizonProductionServer) || (config instanceof HorizonTestServer);
  }

  // TODO: Move this out
  private checkNetworkStatus(server: HorizonNetworkServer): void {
    this.horizonApi.get('/').subscribe((r) => {
      server.isReachable = true;
      this.requestState = 'ready';
      this.allowFriendbot = server.friendbotIsEnabled;
    }, (e) => {
      server.isReachable = false;
      this.requestState = 'error';
      this.allowFriendbot = false;
    });

  }
}
