import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsDashboardComponent } from '../account-settings-dashboard/account-settings-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsDashboardComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: []
})
export class SettingsRoutingModule { }
