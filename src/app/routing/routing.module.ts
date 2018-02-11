import { HelloAdminComponent } from './../hello-admin/hello-admin.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HelloAdminComponent,
    children: []
  }, {
    path: 'accounts',
    loadChildren: './../stellar-accounts/stellar-accounts.module#StellarAccountsModule'
  }, {
    path: 'login',
    loadChildren: './../login/login.module#LoginModule'
  },
  {
    path: 'settings',
    loadChildren: './../settings/settings.module#SettingsModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class RoutingModule { }
