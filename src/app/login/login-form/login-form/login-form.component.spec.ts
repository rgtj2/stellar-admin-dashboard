import { NetworkEnvironmentService } from './../../../services/network-environment/network-environment.service';
import { AppStateService } from './../../../services/app-state/app-state.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoginService } from '../../../services/auth/login/login.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  StellarAccountGeneratorService
} from '../../../services/stellar-account/stellar-account-generator/stellar-account-generator.service';
import { Router } from '@angular/router';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockLoginService, mockLoginRequest;
  let mockFormBuilder, mockFormGroup;
  let mockAppState;
  let mockNetworkEnvironment;
  let mockAccountGenerator;
  let mockRouter;

  beforeEach(async(() => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['loginWithStellarKeypair', 'loginWithFileAndPassword']);
    mockLoginRequest = new Subject();
    mockLoginService.loginWithStellarKeypair.and.returnValue(mockLoginRequest);
    mockLoginService.loginWithFileAndPassword.and.returnValue(mockLoginRequest);
    mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
    mockFormGroup = jasmine.createSpyObj('FormGroup', ['patchValue']);
    mockFormBuilder.group.and.returnValue(mockFormGroup);
    mockAppState = {
      userState: new BehaviorSubject('none'),
      authState: new BehaviorSubject('unauthorized')
    };
    mockNetworkEnvironment = {horizonConfig: null};
    mockAccountGenerator = jasmine.createSpyObj('AccountGenerator', ['generateKeypair']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      providers: [
        {provide: LoginService, useValue: mockLoginService},
        {provide: FormBuilder, useValue: mockFormBuilder},
        {provide: AppStateService, useValue: mockAppState},
        {provide: NetworkEnvironmentService, useValue: mockNetworkEnvironment},
        {provide: StellarAccountGeneratorService, useValue: mockAccountGenerator},
        {provide: Router, useValue: mockRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
