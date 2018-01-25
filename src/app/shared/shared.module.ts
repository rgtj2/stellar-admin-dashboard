import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { AccountGlimpseComponent } from './accounts/account-glimpse/account-glimpse.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TransactionListComponent,
    AccountGlimpseComponent
  ],
  exports: [
    TransactionListComponent,
    AccountGlimpseComponent
  ]
})
export class SharedModule { }
