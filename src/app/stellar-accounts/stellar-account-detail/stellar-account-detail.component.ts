import { AccountFileAccountMasterConfig } from '../../services/auth/account-file/account-file';
import { StellarAccountService } from './../../services/stellar-account/stellar-account.service';
import { AppStateService, NetworkState } from './../../services/app-state/app-state.service';
import { NetworkEnvironmentService } from './../../services/network-environment/network-environment.service';
import { StellarAccountData } from './../../shared/models/stellar-account/stellar-account-data';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Resolvers } from '../resolvers/resolvers';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-stellar-account-detail',
  templateUrl: './stellar-account-detail.component.html',
  styleUrls: ['./stellar-account-detail.component.css']
})
export class StellarAccountDetailComponent implements OnInit, OnDestroy {
  public accountData: StellarAccountData;
  public userFileForAccount: AccountFileAccountMasterConfig | null;
  private routeUpdates: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appState: AppStateService) { }

  ngOnInit() {
    this.accountData = null;
    this.setStateFromRoute();
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  private setStateFromRoute(): void {
    this.routeUpdates = this.route.data.subscribe((d: Resolvers.StellarAccountDetail) => {
      this.accountData = d.accountData;
      this.userFileForAccount = this.currentUserAccount;
    });
  }

  // TODO: Not this
  private get currentUserAccount(): AccountFileAccountMasterConfig | null {
    if (this.appState.userState.value === 'none') {
      return null;
    } else {
      return this.appState.userState.value.accountFileMasterConfigForStellarPublicKey(this.accountData.accountId);
    }
  }

  private clearSubscriptions(): void {
    if (this.routeUpdates !== null) { this.routeUpdates.unsubscribe(); }
    this.routeUpdates = null;
  }

}
