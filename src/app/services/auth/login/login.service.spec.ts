import { AppStateService } from './../../app-state/app-state.service';
import { Subject } from 'rxjs/Subject';
import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { AccountFileLoaderService } from '../account-file/account-file-loader.service';
import { TwoFactorService } from '../two-factor/two-factor.service';

describe('LoginService', () => {
  let service: LoginService;
  let mockAccountFileLoader, mockFileLoad;
  let mockTwoFactor, mockTwoFactorCall;
  let mockAppState;

  beforeEach(() => {
    mockFileLoad = new Subject();
    mockAccountFileLoader = jasmine.createSpyObj('Loader', ['loadFile']);
    mockAccountFileLoader.loadFile.and.returnFile(mockFileLoad);
    mockTwoFactorCall = new Subject();
    mockTwoFactor = jasmine.createSpyObj('TwoFactor', ['authorize']);
    mockTwoFactor.authorize.and.returnValue(mockTwoFactorCall);
    mockAppState = {};
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        {provide: AccountFileLoaderService, useValue: mockAccountFileLoader},
        {provide: TwoFactorService, useValue: mockTwoFactor},
        {provide: AppStateService, useVale: mockAppState}
      ]
    });
  });

  beforeEach(inject([LoginService], (s: LoginService) => {
    service = s;
  }));
});
