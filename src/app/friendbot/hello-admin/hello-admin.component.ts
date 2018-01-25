import { AccountGeneratorService } from './../../services/accounts/account-generator/account-generator.service';
import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../../services/horizon-api/horizon-api.service';
import { FriendbotService } from '../../services/friendbot/friendbot.service';

@Component({
  selector: 'app-hello-admin',
  templateUrl: './hello-admin.component.html',
  styleUrls: ['./hello-admin.component.css']
})
export class HelloAdminComponent implements OnInit {
  public ephemeralAdminAccount: {secret: string, publicKey: string};
  public accountFunded: boolean;
  public fundingProgress: boolean;

  constructor(private friendbot: FriendbotService,
              private accountGenerator: AccountGeneratorService) { }

  ngOnInit() {
    this.ephemeralAdminAccount = this.accountGenerator.generateAccount();
    this.accountFunded = false;
    this.fundingProgress = false;
  }

  public fundAdminAccount(): void {
    this.fundingProgress = true;
    this.friendbot.requestFunds(this.ephemeralAdminAccount.publicKey)
      .subscribe((r) => {
        this.fundingProgress = false;
        this.accountFunded = true;
      });
  }

}
