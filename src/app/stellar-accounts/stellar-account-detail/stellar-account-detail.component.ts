import { StellarAccountData } from './../../shared/models/stellar-account/stellar-account-data';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Resolvers } from '../resolvers/resolvers';

@Component({
  selector: 'app-stellar-account-detail',
  templateUrl: './stellar-account-detail.component.html',
  styleUrls: ['./stellar-account-detail.component.css']
})
export class StellarAccountDetailComponent implements OnInit {
  public accountData: StellarAccountData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.setStateFromRoute();
  }

  setStateFromRoute(): void {
    this.route.data.subscribe((d: Resolvers.StellarAccountDetail) => {
      this.accountData = d.accountData;
    });
  }

}
