import { AccountGeneratorService } from './../../services/accounts/account-generator/account-generator.service';
import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../../services/horizon-api/horizon-api.service';
import { FriendbotService } from '../../services/friendbot/friendbot.service';

/**
 * HelloAdminComponent
 *
 * This component is in the spirit of a 'hello-world',
 * but moreso an intro and 'getting started' tool for developing on top of the Stellar network.
 *
 * It currently works with a local network running in ephemeral mode, creates an ephemeral 'admin' account,
 * and provides UI for requesting funds from FriendBot and displaying the ephemeral 'admin' account balances
 */

@Component({
  selector: 'app-hello-admin',
  templateUrl: './hello-admin.component.html',
  styleUrls: ['./hello-admin.component.css']
})
export class HelloAdminComponent implements OnInit {
  // TODO: Generalize accounts
  public ephemeralAdminAccount: {secret: string, publicKey: string};
  // TODO: Add types
  public adminFundState: 'unfunded' | 'funded';
  // TODO: Add to API, make better, etc
  public requestState: 'ready' | 'waiting' | 'complete' | 'error';

  constructor(private friendbot: FriendbotService,
              private accountGenerator: AccountGeneratorService) { }

  ngOnInit() {
    // TODO: Only do this if ephemeral
    this.ephemeralAdminAccount = this.accountGenerator.generateAccount();
    // TODO: Load persistent account(s), etc
    this.adminFundState = 'unfunded';
    // TODO: Check network, etc
    this.requestState = 'ready';
  }

  public fundAdminAccount(): void {
    this.requestState = 'waiting';
    this.friendbot.requestFunds(this.ephemeralAdminAccount.publicKey)
      .subscribe((r) => {
        // TODO: Move / improve Response Parsing
        this.requestState = 'complete';
        this.adminFundState = 'funded';
      }, () => {
        // TODO: Move / improve Error Handling
        this.requestState = 'error';
      });
  }

}
