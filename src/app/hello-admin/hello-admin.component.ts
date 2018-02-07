import { Subscription } from 'rxjs/Subscription';
import { AppStateService, UserState, NetworkState } from './../services/app-state/app-state.service';
import { LoginService } from './../services/auth/login/login.service';
import { AccountFileDownloadService } from './../services/auth/account-file/account-file-download.service';
import { AccountFile, AccountFileAccountMasterConfig } from './../services/auth/account-file/account-file';
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

import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * HelloAdminComponent
 *
 * This component is in the spirit of a 'hello-world',
 * but moreso an intro and 'getting started' tool for developing on top of the Stellar network.
 */

@Component({
  selector: 'app-hello-admin',
  templateUrl: './hello-admin.component.html',
  styleUrls: ['./hello-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloAdminComponent implements OnInit, OnDestroy {
  public showLoginLink: boolean;
  public showLogoutLink: boolean;
  public showAdminDashboard: boolean;
  public showSettingsLink: boolean;
  public accountMaster: AccountMaster;
  public accounts: AccountFileAccountMasterConfig[];
  public networkAllowsFriendbot: boolean;
  private networkUpdates: Subscription;
  private userUpdates: Subscription;

  constructor(private appState: AppStateService,
              private network: NetworkEnvironmentService,
              private router: Router,
              private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.clearState();
    this.initUserState(this.appState.userState.value);
    this.userUpdates = this.appState.userState.subscribe((m) => {
      console.log('userState!', m);
      this.initUserState(m);
    });
    this.networkUpdates = this.appState.networkState.subscribe((s) => {
      console.log('network state!', s);
      this.initNetworkState(s);
    });
  }

  ngOnDestroy() {
    this.userUpdates.unsubscribe();
    this.networkUpdates.unsubscribe();
  }

  private clearState(): void {
    this.showLoginLink = false;
    this.showLogoutLink = false;
    this.showAdminDashboard = false;
    this.showSettingsLink = false;
    this.accountMaster = null;
    this.accounts = [];
  }

  private initUserState(userState: UserState): void {
    if (userState instanceof AccountMaster) {
      this.showAdminDashboard = true;
      this.showLogoutLink = true;
      this.showSettingsLink = true;
      this.accountMaster = userState;
      this.accounts = this.accountMaster.accountFile.stellarAccounts;
    } else {
      this.showLoginLink = true;
    }
  }

  private initNetworkState(networkState: NetworkState): void {
    console.log(networkState);
    console.log(this.network.horizonConfig);
    if (networkState === 'connected' && this.network.horizonConfig !== 'NetworkConfigError') {
      this.networkAllowsFriendbot = this.network.horizonConfig.friendbotIsEnabled;
    } else {
      this.networkAllowsFriendbot = false;
    }
    this.changeRef.markForCheck();
  }

  // TODO: Move this to a route
  public logout(): void {
    this.appState.authState.next('unauthorized');
    this.appState.userState.next('none');
    this.ngOnInit();
  }

  public accountPublicKey(account: AccountFileAccountMasterConfig): string {
    return account.stellarAccountConfig.publicKey;
    // const config = this.network.setConfigByPassphrase(account.networkConfig.passphrase);
    // this.router.navigate(['/accounts', publicKey]);
  }

}
