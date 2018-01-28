import { environment } from './../../../environments/environment';
import { HorizonApiService } from './horizon-api.service';
import { PRODUCTION_HORIZON_URL, TEST_HORIZON_URL } from './../injection-tokens';
import { QueryRunnerService } from './query-runner/query-runner.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HorizonApiService,
    QueryRunnerService,
    {provide: PRODUCTION_HORIZON_URL, useValue: environment.PRODUCTION_HORIZON_URL},
    {provide: TEST_HORIZON_URL, useValue: environment.TEST_HORIZON_URL}
  ]
})
export class HorizonApiModule { }
