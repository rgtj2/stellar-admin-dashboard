import { AccountGeneratorService } from './accounts/account-generator/account-generator.service';
import { FriendbotService } from './friendbot/friendbot.service';
import { NetworkEnvironmentService } from './network-environment/network-environment.service';
import { StellarBaseSdkService } from './stellar-sdk/stellar-base-sdk.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HorizonApiModule } from './horizon-api/horizon-api.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HorizonApiModule
  ],
  declarations: [],
  providers: [
    AccountGeneratorService,
    FriendbotService,
    NetworkEnvironmentService,
    StellarBaseSdkService
  ]
})
export class ServicesModule { }
