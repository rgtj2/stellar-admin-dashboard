import { Account } from '../shared/models/account';
import { AccountGeneratorService } from '../services/accounts/account-generator/account-generator.service';
import { FriendbotService } from '../services/friendbot/friendbot.service';
import { HorizonApiService } from '../services/horizon-api/horizon-api.service';
import { NetworkEnvironmentService } from './../services/network-environment/network-environment.service';

import { Component, OnInit, Inject } from '@angular/core';

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
  public adminAccount: Account;
  public allowFriendbot: boolean;
  public requestState: 'ready' | 'waiting' | 'complete' | 'error';

  constructor(private friendbot: FriendbotService,
              private accountGenerator: AccountGeneratorService,
              private networkEnvironment: NetworkEnvironmentService) { }

  ngOnInit() {
    this.allowFriendbot = this.networkEnvironment.friendbotIsEnabled;
    this.initializeAdminAccount();
  }

  public fundAdminAccount(): void {
    this.requestState = 'waiting';
    this.friendbot.requestFunds(this.adminAccount.publicKey)
      .subscribe((r) => {
        // TODO: Move / improve Response Parsing
        this.requestState = 'complete';
        this.adminFundState = 'funded';
      }, () => {
        // TODO: Move / improve Error Handling
        this.requestState = 'error';
      });
  }

  private initializeAdminAccount(): void {
    if (this.networkEnvironment.isPersistent) {
      throw new Error('TODO: Provide interfaces for existing accounts');
    } else {
      this.adminAccount = this.accountGenerator.generateAccount();
      this.adminFundState = 'unfunded';
      this.requestState = 'ready';
    }
  }
}
