import { AppStateService } from './../../services/app-state/app-state.service';
import { Component, OnInit, Input } from '@angular/core';
import { FriendbotService } from '../../services/horizon-api/friendbot/friendbot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendbot',
  templateUrl: './friendbot.component.html',
  styleUrls: ['./friendbot.component.css']
})
export class FriendbotComponent implements OnInit {
  @Input() private publicKey: string;

  constructor(private friendbot: FriendbotService,
              private appState: AppStateService,
              private router: Router) { }

  ngOnInit() {
  }

  public fundAccount(): void {
    this.appState.requestState.next('waiting');
    this.friendbot.requestFunds(this.publicKey)
      .subscribe((r) => {
        this.appState.requestState.next('complete');
        this.router.navigate(['accounts', this.publicKey]);
      }, () => {
        this.appState.requestState.next('error');
      });
  }
}
