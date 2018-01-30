import { StellarAccountDetailComponent } from './stellar-account-detail/stellar-account-detail.component';
import { StellarAccountsRoutingModule } from './routing/stellar-accounts-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    StellarAccountsRoutingModule
  ],
  declarations: [
    StellarAccountDetailComponent
  ]
})
export class StellarAccountsModule { }
