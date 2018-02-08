import { LoggedInGuard } from './../../services/auth/login/logged-in-guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsDashboardComponent } from '../account-settings-dashboard/account-settings-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsDashboardComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [
    LoggedInGuard
  ]
})
export class SettingsRoutingModule { }
