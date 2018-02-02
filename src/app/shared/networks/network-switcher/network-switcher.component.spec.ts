import { NetworkEnvironmentService } from './../../../services/network-environment/network-environment.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSwitcherComponent } from './network-switcher.component';

describe('NetworkSwitcherComponent', () => {
  let component: NetworkSwitcherComponent;
  let fixture: ComponentFixture<NetworkSwitcherComponent>;
  let mockNetworkEnvironment;

  beforeEach(async(() => {
    mockNetworkEnvironment = jasmine.createSpyObj('NetworkEnvironment', ['setConfig']);
    TestBed.configureTestingModule({
      declarations: [ NetworkSwitcherComponent ],
      providers: [
        {provide: NetworkEnvironmentService, useValue: mockNetworkEnvironment}
      ]
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
