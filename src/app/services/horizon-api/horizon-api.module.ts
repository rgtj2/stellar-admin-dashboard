import { environment } from './../../../environments/environment';

import { FriendbotService } from './friendbot/friendbot.service';
import { HorizonApiService } from './horizon-api.service';
import { HORIZON_PRODUCTION_URL, HORIZON_TEST_URL, NETWORK_IS_PERSISTENT } from './../injection-tokens';
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
    {provide: HORIZON_PRODUCTION_URL, useValue: environment.HORIZON_PRODUCTION_URL},
    {provide: HORIZON_TEST_URL, useValue: environment.HORIZON_TEST_URL},
    {provide: NETWORK_IS_PERSISTENT, useValue: environment.NETWORK_IS_PERSISTENT}
  ]
})
export class HorizonApiModule { }
