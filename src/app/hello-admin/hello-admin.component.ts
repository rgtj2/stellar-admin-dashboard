import { FriendbotService } from '../services/horizon-api/friendbot/friendbot.service';
import { HorizonApiService } from '../services/horizon-api/horizon-api.service';
import { NetworkEnvironmentService } from './../services/network-environment/network-environment.service';
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

  constructor(private friendbot: FriendbotService,
              private accountGenerator: StellarAccountGeneratorService,
              private networkEnvironment: NetworkEnvironmentService,
              private router: Router) { }

  ngOnInit() {
    this.allowFriendbot = this.networkEnvironment.horizonConfig.friendbotIsEnabled;
    this.loadExistingAccount = false;
    this.initializeAdminAccount();
  }

  public fundAdminAccount(): void {
    this.requestState = 'waiting';
    this.friendbot.requestFunds(this.keypair.publicKey)
      .subscribe((r) => {
        // TODO: Move / improve Response Parsing
        this.requestState = 'complete';
        this.adminFundState = 'funded';
        this.router.navigate(['accounts', this.keypair.publicKey]);
      }, () => {
        // TODO: Move / improve Error Handling
        this.requestState = 'error';
      });
  }

  private initializeAdminAccount(): void {
    if (this.loadExistingAccount) {
      throw new Error('TODO: Provide interfaces for existing accounts');
    } else {
      this.keypair = this.accountGenerator.generateKeypair();
      this.adminFundState = 'unfunded';
      this.requestState = 'ready';
    }
  }
}
