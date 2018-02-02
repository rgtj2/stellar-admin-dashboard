import { HorizonNetworkConfig } from './../../../services/network-environment/network-environment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-network-glimpse',
  templateUrl: './network-glimpse.component.html',
  styleUrls: ['./network-glimpse.component.css']
})
export class NetworkGlimpseComponent implements OnInit {
  @Input() public networkConfig: HorizonNetworkConfig;

  constructor() { }

  ngOnInit() {
  }

}
