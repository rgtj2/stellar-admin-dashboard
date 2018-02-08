import { AppStateService } from './services/app-state/app-state.service';
import { HorizonApiService } from './services/horizon-api/horizon-api.service';
import { AppComponent } from './app.component';
import { NetworkEnvironmentService } from './services/network-environment/network-environment.service';
import { TestComponentHandle } from './utilities/testing/test-component-handle/test-component-handle';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

describe('AppComponent', () => {
  let component: AppComponent;
  let handle: TestComponentHandle<AppComponent>;
  let mockAppState;

  beforeEach(async(() => {
    mockAppState = {
      requestState: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: AppStateService, useValue: mockAppState}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    handle = new TestComponentHandle(fixture);
    handle.detectChanges();
    component = handle.componentInstance;
  });

  describe('component', () => {
    it('should exist', () => {
      expect(component).toBeDefined();
    });
  });
});
