import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AccountMaster } from '../auth/account-master';

export type AuthState = 'authorized' | 'unauthorized';
export type NetworkState = 'connected' | 'disconnected' | 'misconfigured';
export type RequestState = 'ready' | 'waiting' | 'complete' | 'error';
export type UserState = AccountMaster | 'none';

@Injectable()
export class AppStateService {
  public authState: BehaviorSubject<AuthState>;
  public networkState: BehaviorSubject<NetworkState>;
  public requestState: BehaviorSubject<RequestState>;
  public userState: BehaviorSubject<UserState>;
  public authUpdates: Observable<AuthState>;
  public networkUpdates: Observable<NetworkState>;
  public requestUpdates: Observable<RequestState>;
  public userUpdates: Observable<UserState>;

  constructor() {
    console.log('construct app state');
    this.resetAuthState();
    this.resetNetworkState();
    this.resetRequestState();
    this.resetUserState();
  }

  private resetAuthState(): void {
    if (this.authState !== null && this.authState !== undefined) {
      this.authState.complete();
      this.authState = null;
    }
    this.authState = new BehaviorSubject(<AuthState>'unauthorized');
    this.authUpdates = this.authState.asObservable().pipe(
      map((r) => {
        console.log('auth state!s', r);
        return r;
      })
    );
  }

  private resetNetworkState(): void {
    if (this.networkState !== null && this.networkState !== undefined) {
      this.networkState.complete();
      this.networkState = null;
    }
    this.networkState = new BehaviorSubject(<NetworkState>'disconnected');
    this.networkUpdates = this.networkState.asObservable().pipe(
      map((r) => {
        console.log('network state!', r);
        return r;
      })
    );
  }

  private resetRequestState(): void {
    if (this.requestState !== null && this.requestState !== undefined) {
      this.requestState.complete();
      this.requestState = null;
    }
    this.requestState = new BehaviorSubject(<RequestState>'ready');
    this.requestUpdates = this.requestState.asObservable().pipe(
      map((r) => {
        console.log('request state!', r);
        return r;
      })
    );
  }

  private resetUserState(): void {
    if (this.userState !== null && this.userState !== undefined) {
      this.userState.complete();
      this.userState = null;
    }
    this.userState = new BehaviorSubject(<UserState>'none');
    console.log('usrstate', this.userState);
    this.userUpdates = this.userState.asObservable().pipe(
      map((r) => {
        console.log('user state!', r);
        return r;
      })
    );
  }
}
