import { NetworkEnvironmentService } from './services/network-environment/network-environment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private networkEnvironment: NetworkEnvironmentService) {}

  ngOnInit(): void {
    this.networkEnvironment.setHorizonURL('test');
  }

}
