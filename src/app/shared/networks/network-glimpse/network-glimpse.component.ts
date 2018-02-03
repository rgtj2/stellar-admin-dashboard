import { HorizonTestServer } from './../../models/horizon-server/horizon-test-server';
import { HorizonNetworkConfig, HorizonNetworkServer } from './../../../services/network-environment/network-environment.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HorizonProductionServer } from '../../models/horizon-server/horizon-production-server';

@Component({
  selector: 'app-network-glimpse',
  templateUrl: './network-glimpse.component.html',
  styleUrls: ['./network-glimpse.component.css']
})
export class NetworkGlimpseComponent implements OnInit, OnChanges {
  @Input() private networkConfig: HorizonNetworkConfig;
  public networkIsValid: boolean;
  public networkServer: HorizonNetworkServer;

  constructor() { }

  ngOnInit() {
    this.setNetworkState();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setNetworkState();
  }

  private setNetworkState(): void {
    if (this.networkConfigIsValid(this.networkConfig)) {
      this.networkIsValid = true;
      this.networkServer = this.networkConfig;
    } else {
      this.networkIsValid = false;
      this.networkServer = null;
    }
  }

  private networkConfigIsValid(networkConfig: HorizonNetworkConfig): networkConfig is HorizonNetworkServer {
    return this.networkConfig instanceof HorizonProductionServer || this.networkConfig instanceof HorizonTestServer;
  }

}
