import { LogoutGuard } from './logout-guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form/login-form.component';

const routes: Routes = [
  {
    path: 'start',
    component: LoginFormComponent,
  },
  {
    path: 'end',
    canActivate: [LogoutGuard]
  },
  {
    path: '', redirectTo: 'start', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: [
    LogoutGuard
  ]
})
export class LoginRoutingModule { }
