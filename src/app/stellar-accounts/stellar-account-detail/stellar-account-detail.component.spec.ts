import { AppStateService } from './../../services/app-state/app-state.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Resolvers } from '../resolvers/resolvers';
import { StellarAccountDetailComponent } from './stellar-account-detail.component';
import { TestComponentHandle } from './../../utilities/testing/test-component-handle/test-component-handle';

import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';

describe('StellarAccountDetailComponent', () => {
  let handle: TestComponentHandle<StellarAccountDetailComponent>;
  let mockActivatedRoute;
  let mockRouter;
  let mockAppState;

  beforeEach(async(() => {
    /**
     * Mock Route
     */
    mockActivatedRoute = {
      data: new Subject()
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAppState = {
      userState: new BehaviorSubject('none')
    };
    TestBed.configureTestingModule({
      declarations: [ StellarAccountDetailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter},
        {provide: AppStateService, useValue: mockAppState}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(StellarAccountDetailComponent);
    handle = new TestComponentHandle(fixture);
    handle.detectChanges();
  });

  describe('.ngOnInit', () => {
    describe('getting data from the route', () => {
      describe('with data', () => {
        let mockData: Resolvers.StellarAccountDetail;
        beforeEach(() => {
          mockData = {
            accountData: {}
          };
          mockActivatedRoute.data.next(mockData);
          handle.detectChanges();
        });
        it('should set .accountData', () => {
          expect(handle.componentInstance.accountData).toBe(mockData.accountData);
        });
      });
    });
  });
});
