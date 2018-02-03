import { StellarAccountDetailComponent } from './stellar-account-detail/stellar-account-detail.component';
import { StellarAccountsRoutingModule } from './routing/stellar-accounts-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    StellarAccountsRoutingModule
  ],
  declarations: [
    StellarAccountDetailComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StellarAccountsModule { }
