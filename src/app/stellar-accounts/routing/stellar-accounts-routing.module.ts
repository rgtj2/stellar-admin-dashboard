import { StellarAccountDataResolveService } from './../resolvers/stellar-account/stellar-account-data-resolve.service';
import { StellarAccountDetailComponent } from '../stellar-account-detail/stellar-account-detail.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':publicKey',
    component: StellarAccountDetailComponent,
    resolve: {
      accountData: StellarAccountDataResolveService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [
    StellarAccountDataResolveService
  ]
})
export class StellarAccountsRoutingModule { }
