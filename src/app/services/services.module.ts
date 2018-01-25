import { AccountGeneratorService } from './accounts/account-generator/account-generator.service';
import { FriendbotService } from './friendbot/friendbot.service';
import { HorizonApiService } from './horizon-api/horizon-api.service';
import { environment } from './../../environments/environment';
import { HttpModule } from '@angular/http';
import { HORIZON_URL } from './injection-tokens';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    HorizonApiService,
    AccountGeneratorService,
    FriendbotService,
    {provide: HORIZON_URL, useValue: environment.HORIZON_URL}
  ]
})
export class ServicesModule { }
