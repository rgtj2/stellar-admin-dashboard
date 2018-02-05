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
  private networkUpdates: Subscription;
  private routeUpdates: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appState: AppStateService,
              private network: NetworkEnvironmentService) { }

  ngOnInit() {
    this.routeUpdates = null;
    this.networkUpdates = null;
    this.setStateFromRoute();
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

  setStateFromRoute(): void {
    this.routeUpdates = this.route.data.subscribe((d: Resolvers.StellarAccountDetail) => {
      this.accountData = d.accountData;
    });
  }

  clearSubscriptions(): void {
    if (this.routeUpdates !== null) { this.routeUpdates.unsubscribe(); }
    this.routeUpdates = null;
    if (this.networkUpdates !== null) { this.networkUpdates.unsubscribe(); }
    this.networkUpdates = null;
  }

}
