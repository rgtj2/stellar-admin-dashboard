import { NetworkGlimpseComponent } from './networks/network-glimpse/network-glimpse.component';
import { NetworkSwitcherComponent } from './networks/network-switcher/network-switcher.component';
import { StellarAccountGlimpseComponent } from './stellar-accounts/stellar-account-glimpse/stellar-account-glimpse.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendbotComponent } from './friendbot/friendbot.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NetworkGlimpseComponent,
    NetworkSwitcherComponent,
    StellarAccountGlimpseComponent,
    TransactionListComponent,
    FriendbotComponent
  ],
  exports: [
    NetworkGlimpseComponent,
    NetworkSwitcherComponent,
    StellarAccountGlimpseComponent,
    TransactionListComponent
  ]
})
export class SharedModule { }
