import { StellarAccountGlimpseComponent } from './stellar-accounts/stellar-account-glimpse/stellar-account-glimpse.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TransactionListComponent,
    StellarAccountGlimpseComponent
  ],
  exports: [
    TransactionListComponent,
    StellarAccountGlimpseComponent
  ]
})
export class SharedModule { }
