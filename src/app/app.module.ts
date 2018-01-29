import { AppComponent } from './app.component';
import { HelloAdminComponent } from './hello-admin/hello-admin.component';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    HelloAdminComponent
  ],
  imports: [
    BrowserModule,
    ServicesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
