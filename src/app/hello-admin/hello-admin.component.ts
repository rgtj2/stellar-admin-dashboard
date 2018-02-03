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
  public keypair: StellarAccountKeypair;
  public allowFriendbot: boolean;
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
    this.loadExistingAccount = false;
    this.initializeAdminAccount();
    this.initializeNetworkStatus();
    this.networkEnvironment.onNetworkChange.subscribe((n) => {
      this.initializeNetworkStatus();
    });
  }

  public downloadAccountMasterFile(): void {
    const networkConfig = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
    const testAccountFile = new AccountFile(
      [{
        alias: 'test',
        networkConfig: {
          url: networkConfig.url,
          passphrase: networkConfig.networkPassphrase
        },
        stellarAccountConfig: this.keypair,
        twoFactorConfig: null
      }], 'test'
    );
    const testAccountMaster: AccountMaster = new AccountMaster(testAccountFile);
    this.testEncryptedData = this.accountFileDownloader.downloadEncryptedFile('test', testAccountMaster);
  }

  public readAccountMasterFile(): void {
    const networkConfig = <HorizonNetworkServer> this.networkEnvironment.horizonConfig;
    this.login.loginWithFileAndPassword(this.testEncryptedData, 'test', 'test', networkConfig)
      .subscribe((v) => {
        console.log(v);
      });
  }

  // TODO: Move this out
  public fundAdminAccount(): void {
    this.requestState = 'waiting';
    this.friendbot.requestFunds(this.keypair.publicKey)
      .subscribe((r) => {
        // TODO: Move / improve Response Parsing
        this.requestState = 'complete';
        this.adminFundState = 'funded';
        // TODO: Move this somewhere else
        this.router.navigate(['accounts', this.keypair.publicKey]);
      }, () => {
        // TODO: Move / improve Error Handling
        this.requestState = 'error';
      });
  }

  // TODO: Move this out
  private initializeAdminAccount(): void {
    if (this.loadExistingAccount) {
      throw new Error('TODO: Provide interfaces for existing accounts');
    } else {
      this.keypair = this.accountGenerator.generateKeypair();
      this.adminFundState = 'unfunded';
      this.requestState = 'ready';
    }
  }

  private initializeNetworkStatus(): void {
    if (this.configIsValid(this.networkEnvironment.horizonConfig)) {
      this.checkNetworkStatus(this.networkEnvironment.horizonConfig);
    } else {
      this.allowFriendbot = false;
      this.requestState = 'error';
    }
  }

  private configIsValid(config: HorizonNetworkConfig): config is HorizonNetworkServer {
    return (config instanceof HorizonProductionServer) || (config instanceof HorizonTestServer);
  }

  private checkNetworkStatus(server: HorizonNetworkServer): void {
    this.horizonApi.get('/').subscribe((r) => {
      server.isReachable = true;
      this.requestState = 'ready';
      this.allowFriendbot = server.friendbotIsEnabled;
    }, (e) => {
      server.isReachable = false;
      this.requestState = 'error';
    });
  }
}
