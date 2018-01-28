import { AccountGeneratorService } from './accounts/account-generator/account-generator.service';
import { FriendbotService } from './friendbot/friendbot.service';
import { HorizonApiService } from './horizon-api/horizon-api.service';
import { StellarBaseSdkService } from './stellar-sdk/stellar-base-sdk.service';

import { HORIZON_URL } from './injection-tokens';
import { environment } from './../../environments/environment';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AccountGeneratorService,
    FriendbotService,
    HorizonApiService,
    StellarBaseSdkService,
    {provide: HORIZON_URL, useValue: environment.HORIZON_URL}
  ]
})
export class ServicesModule { }
