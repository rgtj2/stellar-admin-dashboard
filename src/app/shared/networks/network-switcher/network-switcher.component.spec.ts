import { AppStateService } from './../../../services/app-state/app-state.service';
import { HorizonApiService } from './../../../services/horizon-api/horizon-api.service';
import { NetworkEnvironmentService } from './../../../services/network-environment/network-environment.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSwitcherComponent } from './network-switcher.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('NetworkSwitcherComponent', () => {
  let component: NetworkSwitcherComponent;
  let fixture: ComponentFixture<NetworkSwitcherComponent>;
  let mockNetworkEnvironment;
  let mockHorizonApi, mockApiRequest;
  let mockAppState;

  beforeEach(async(() => {
    mockNetworkEnvironment = jasmine.createSpyObj('NetworkEnvironment', ['setConfigByAlias']);
    mockApiRequest = new Subject();
    mockHorizonApi = jasmine.createSpyObj('HorizonApi', ['get']);
    mockHorizonApi.get.and.returnValue(mockApiRequest);
    mockAppState = {
      networkState: new BehaviorSubject('connected'),
      requestState: new BehaviorSubject('ready')
    };
    TestBed.configureTestingModule({
      declarations: [ NetworkSwitcherComponent ],
      providers: [
        {provide: NetworkEnvironmentService, useValue: mockNetworkEnvironment},
        {provide: HorizonApiService, useValue: mockHorizonApi},
        {provide: AppStateService, useValue: mockAppState}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
