import { Resolvers } from '../resolvers/resolvers';
import { StellarAccountDetailComponent } from './stellar-account-detail.component';
import { TestComponentHandle } from './../../utilties/testing/test-component-handle/test-component-handle';

import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StellarAccountDetailComponent', () => {
  let handle: TestComponentHandle<StellarAccountDetailComponent>;
  let mockActivatedRoute;

  beforeEach(async(() => {
    /**
     * Mock Route
     */
    mockActivatedRoute = {
      data: new Subject()
    };
    TestBed.configureTestingModule({
      declarations: [ StellarAccountDetailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
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
