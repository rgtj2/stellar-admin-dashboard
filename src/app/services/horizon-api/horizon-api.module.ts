import { environment } from './../../../environments/environment';

import { FriendbotService } from './friendbot/friendbot.service';
import { HorizonApiService } from './horizon-api.service';
import {
  CUSTOM_HORIZON_PRODUCTION_URL,
  CUSTOM_HORIZON_TEST_URL,
  CUSTOM_NETWORK_PRODUCTION_PASSPHRASE,
  CUSTOM_NETWORK_TEST_PASSPHRASE,
  STELLAR_HORIZON_PRODUCTION_URL,
  STELLAR_HORIZON_TEST_URL,
  STELLAR_NETWORK_PRODUCTION_PASSPHRASE,
  STELLAR_NETWORK_TEST_PASSPHRASE
} from './../injection-tokens';
import { QueryRunnerService } from './query-runner/query-runner.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FriendbotService,
    HorizonApiService,
    QueryRunnerService,
    {provide: CUSTOM_HORIZON_PRODUCTION_URL, useValue: environment.CUSTOM_HORIZON_PRODUCTION_URL},
    {provide: CUSTOM_HORIZON_TEST_URL, useValue: environment.CUSTOM_HORIZON_TEST_URL},
    {provide: CUSTOM_NETWORK_PRODUCTION_PASSPHRASE, useValue: environment.CUSTOM_NETWORK_PRODUCTION_PASSPHRASE},
    {provide: CUSTOM_NETWORK_TEST_PASSPHRASE, useValue: environment.CUSTOM_NETWORK_TEST_PASSPHRASE},
    {provide: STELLAR_HORIZON_PRODUCTION_URL, useValue: environment.STELLAR_HORIZON_PRODUCTION_URL},
    {provide: STELLAR_HORIZON_TEST_URL, useValue: environment.STELLAR_HORIZON_TEST_URL},
    {provide: STELLAR_NETWORK_PRODUCTION_PASSPHRASE, useValue: environment.STELLAR_NETWORK_PRODUCTION_PASSPHRASE},
    {provide: STELLAR_NETWORK_TEST_PASSPHRASE, useValue: environment.STELLAR_NETWORK_TEST_PASSPHRASE}
  ]
})
export class HorizonApiModule { }
