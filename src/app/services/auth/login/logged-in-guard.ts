import { AppStateService } from '../../app-state/app-state.service';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.appState.userState.value === 'none') {
      this.router.navigate(['/login/start']);
      return false;
    } else {
      return true;
    }
  }
}
