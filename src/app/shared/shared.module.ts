import { NetworkGlimpseComponent } from './networks/network-glimpse/network-glimpse.component';
import { NetworkSwitcherComponent } from './networks/network-switcher/network-switcher.component';
import { StellarAccountGlimpseComponent } from './stellar-accounts/stellar-account-glimpse/stellar-account-glimpse.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendbotComponent } from './friendbot/friendbot.component';
import { AccountIdPipe } from './pipes/account-id.pipe';
import { PipesModule } from './pipes/pipes.module';
import { SignerListComponent } from './stellar-accounts/signers/signer-list/signer-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NetworkGlimpseComponent,
    NetworkSwitcherComponent,
    StellarAccountGlimpseComponent,
    TransactionListComponent,
    FriendbotComponent,
    AccountIdPipe,
    SignerListComponent
  ],
  exports: [
    FriendbotComponent,
    NetworkGlimpseComponent,
    NetworkSwitcherComponent,
    StellarAccountGlimpseComponent,
    TransactionListComponent,
    AccountIdPipe,
    SignerListComponent
  ]
})
export class SharedModule { }
