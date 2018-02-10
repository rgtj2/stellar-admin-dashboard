import { FontawesomeService } from './utilities/fonts/fontawesome.service';
import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { HelloAdminComponent } from './hello-admin/hello-admin.component';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    FontawesomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
