import { RequestState, AppStateService, NetworkState } from './../../../services/app-state/app-state.service';
import { HorizonApiService } from './../../../services/horizon-api/horizon-api.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  NetworkEnvironmentService,
  HorizonNetworkConfig,
  HorizonNetworkAlias,
  HorizonNetworkServer
} from '../../../services/network-environment/network-environment.service';
import { HorizonProductionServer } from '../../models/horizon-server/horizon-production-server';
import { HorizonTestServer } from '../../models/horizon-server/horizon-test-server';
import { AccountMaster } from '../../../services/auth/account-master';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-network-switcher',
  templateUrl: './network-switcher.component.html',
  styleUrls: ['./network-switcher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkSwitcherComponent implements OnInit {
  private networkConfig: HorizonNetworkConfig;
  public currentAlias: HorizonNetworkAlias;
  public showOptions: boolean;
  public networkState: NetworkState;
  public requestState: RequestState;
  private networkStatusRequest: Subscription;

  constructor(private networkEnvironment: NetworkEnvironmentService,
              private horizonApi: HorizonApiService,
              private appState: AppStateService) { }

  ngOnInit() {
    this.networkStatusRequest = null;
    this.requestState = null;
    this.networkState = null;
    this.showOptions = false;
    this.networkConfig = null;
    this.currentAlias = null;
    this.setNetworkConfig('customTest');
    // Move this out of here ^^

    console.log(this.appState);
  }

  public setNetworkConfig(alias: HorizonNetworkAlias): void {
    this.currentAlias = alias;
    this.networkEnvironment.setConfigByAlias(alias);
    if (this.configIsValid(this.networkEnvironment.horizonConfig)) {
      this.checkNetworkStatus(this.networkEnvironment.horizonConfig);
    } else {
      this.networkState = 'misconfigured';
    }
    this.showOptions = false;
  }

  private configIsValid(config: HorizonNetworkConfig): config is HorizonNetworkServer {
    return (config instanceof HorizonProductionServer) || (config instanceof HorizonTestServer);
  }

  private checkNetworkStatus(server: HorizonNetworkServer): void {
    this.networkStatusRequest = this.horizonApi.get('/').subscribe((r) => {
      this.networkState = 'connected';
      this.requestState = 'ready';
      this.appState.networkState.next(this.networkState);
      this.appState.requestState.next(this.requestState);
      // this.allowFriendbot = server.friendbotIsEnabled;
    }, (e) => {
      this.networkState = 'disconnected';
      this.requestState = 'error';
      this.appState.networkState.next(this.networkState);
      this.appState.requestState.next(this.requestState);
      // this.allowFriendbot = false;
    });
  }

  private resetNetworkStatusRequest(): void {
    if (this.networkStatusRequest !== null) {
      this.networkStatusRequest.unsubscribe();
    }
    this.networkStatusRequest = null;
  }
}
