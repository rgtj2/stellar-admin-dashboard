import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { HelloAdminComponent } from './hello-admin/hello-admin.component';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StellarAccountsModule } from './stellar-accounts/stellar-accounts.module';

@NgModule({
  declarations: [
    AppComponent,
    HelloAdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutingModule,
    ServicesModule,
    SharedModule,
    StellarAccountsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
