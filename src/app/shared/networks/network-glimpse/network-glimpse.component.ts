import { AppStateService, NetworkState } from './../../../services/app-state/app-state.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-network-glimpse',
  templateUrl: './network-glimpse.component.html',
  styleUrls: ['./network-glimpse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkGlimpseComponent implements OnInit {
  public networkState: NetworkState;
  public networkLastChecked: Date|null;

  constructor(private appState: AppStateService, private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.networkLastChecked = null;
    this.setNetworkState(this.appState.networkState.value);
    this.appState.networkUpdates.subscribe(this.setNetworkState.bind(this));
  }

  private setNetworkState(networkState: NetworkState): void {
    this.networkState = networkState;
    this.networkLastChecked = new Date();
    this.changeRef.markForCheck();
  }

}
