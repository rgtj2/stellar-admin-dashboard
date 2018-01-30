import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StellarAccountDetailComponent } from './stellar-account-detail/stellar-account-detail.component';
import { StellarAccountsRoutingModule } from './routing/stellar-accounts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StellarAccountsRoutingModule
  ],
  declarations: [StellarAccountDetailComponent]
})
export class StellarAccountsModule { }
