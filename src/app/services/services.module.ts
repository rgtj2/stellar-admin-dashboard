import { environment } from './../../environments/environment';
import { HorizonApiModule } from './horizon-api/horizon-api.module';
import { NetworkEnvironmentService } from './network-environment/network-environment.service';
import { StellarAccountService } from './stellar-account/stellar-account.service';
import { StellarBaseSdkService } from './stellar-sdk/stellar-base-sdk.service';
import { StellarAccountGeneratorService } from './stellar-account/stellar-account-generator/stellar-account-generator.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HorizonApiModule
  ],
  declarations: [],
  providers: [
    NetworkEnvironmentService,
    StellarAccountService,
    StellarAccountGeneratorService,
    StellarBaseSdkService
  ]
})
export class ServicesModule { }
