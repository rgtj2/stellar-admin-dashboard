import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form/login-form.component';

const routes: Routes = [
  {
    path: 'form',
    component: LoginFormComponent,
  },
  {
    path: '', redirectTo: 'form', pathMatch: 'full'
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
export class LoginRoutingModule { }
