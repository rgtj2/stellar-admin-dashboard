import { UserState, AppStateService } from './../../services/app-state/app-state.service';
import { AccountMaster } from './../../services/auth/account-master';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  public showLoginLink: boolean;
  public showLogoutLink: boolean;
  public showSettingsLink: boolean;
  private userUpdates: Subscription;

  constructor(private appState: AppStateService) { }

  ngOnInit() {
    this.clearState();
    this.subscribeToUserUpdates();
  }

  ngOnDestroy() {
    this.userUpdates.unsubscribe();
  }

  private subscribeToUserUpdates(): void {
    this.userUpdates = this.appState.userState.subscribe((m) => {
      console.log('userState!', m);
      this.initLinks(m);
    });
  }

  private clearState(): void {
    this.showLoginLink = false;
    this.showLogoutLink = false;
    this.showSettingsLink = false;
  }

  private initLinks(userState: UserState): void {
    if (userState instanceof AccountMaster) {
      this.showLogoutLink = true;
      this.showLoginLink = false;
      this.showSettingsLink = true;
    } else {
      this.showLoginLink = true;
      this.showLogoutLink = false;
      this.showSettingsLink = false;
    }
  }

}
