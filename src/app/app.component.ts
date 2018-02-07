import { AppStateService } from './services/app-state/app-state.service';
import {
  NetworkEnvironmentService,
  HorizonNetworkAlias,
  HorizonNetworkConfig,
  HorizonNetworkServer
} from './services/network-environment/network-environment.service';

import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from './services/horizon-api/horizon-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private appState: AppStateService) {}

  ngOnInit(): void {
    this.appState.requestState.subscribe((r) => {
      console.log('request state', r);
    });
  }

}
