import { Component, OnInit } from '@angular/core';
import {
  NetworkEnvironmentService,
  HorizonNetworkConfig,
  HorizonNetworkAlias,
  HorizonNetworkServer
} from '../../../services/network-environment/network-environment.service';

@Component({
  selector: 'app-network-switcher',
  templateUrl: './network-switcher.component.html',
  styleUrls: ['./network-switcher.component.css']
})
export class NetworkSwitcherComponent implements OnInit {
  public networkConfig: HorizonNetworkConfig;

  constructor(private networkEnvironment: NetworkEnvironmentService) { }

  ngOnInit() {
    this.setNetworkConfig('customTest');
  }

  public setNetworkConfig(env: HorizonNetworkAlias): void {
    this.networkEnvironment.setConfig(env);
    this.networkConfig = this.networkEnvironment.horizonConfig;
  }

}
