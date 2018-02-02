import { NetworkEnvironmentService, HorizonNetworkEnvironment } from './services/network-environment/network-environment.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public networkConfig;
  constructor(private networkEnvironment: NetworkEnvironmentService) {}

  ngOnInit(): void {
    this.setNetworkConfig('customTest');
  }

  setNetworkConfig(env: HorizonNetworkEnvironment): void {
    this.networkEnvironment.setConfig(env);
    this.networkConfig = this.networkEnvironment.horizonConfig;
    console.log(this.networkEnvironment.horizonConfig);
  }

}
