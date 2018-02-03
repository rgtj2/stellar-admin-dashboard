import { TwoFactorService } from './auth/two-factor/two-factor.service';
import { AccountFileDownloadService } from './auth/account-file/account-file-download.service';
import { AccountFileCreatorService } from './auth/account-file/account-file-creator.service';
import { AccountFile } from './auth/account-file/account-file';
import { environment } from './../../environments/environment';
import { HorizonApiModule } from './horizon-api/horizon-api.module';
import { NetworkEnvironmentService } from './network-environment/network-environment.service';
import { StellarAccountService } from './stellar-account/stellar-account.service';
import { StellarBaseSdkService } from './stellar-sdk/stellar-base-sdk.service';
import { StellarAccountGeneratorService } from './stellar-account/stellar-account-generator/stellar-account-generator.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WindowReferenceService } from './js-reference/window-reference.service';
import { FileReaderReferenceService } from './js-reference/file-reader-reference.service';
import { JSCryptoService } from './js-crypto/js-crypto.service';
import { AccountFileLoaderService } from './auth/account-file/account-file-loader.service';
import { AccountFileReaderService } from './auth/account-file/account-file-reader.service';
import { LoginService } from './auth/login/login.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HorizonApiModule
  ],
  declarations: [],
  providers: [
    AccountFileCreatorService,
    AccountFileDownloadService,
    AccountFileLoaderService,
    AccountFileReaderService,
    LoginService,
    FileReaderReferenceService,
    JSCryptoService,
    NetworkEnvironmentService,
    StellarAccountService,
    StellarAccountGeneratorService,
    StellarBaseSdkService,
    TwoFactorService,
    WindowReferenceService
  ]
})
export class ServicesModule { }
