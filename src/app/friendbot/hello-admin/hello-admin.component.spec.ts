/**
 * App-related services / components / etc
 */
import { AccountGeneratorService } from './../../services/accounts/account-generator/account-generator.service';
import { FriendbotService } from './../../services/friendbot/friendbot.service';
import { HelloAdminComponent } from './hello-admin.component';
import { TestComponentHandle } from './../../utilties/test-helpers/test-component-handle/test-component-handle';

/**
 * System / libraries
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Subject } from 'rxjs/Subject';

describe('HelloAdminComponent', () => {
  /**
   * Mocks / helpers used accross all tests
   */
  let component: HelloAdminComponent;
  let handle: TestComponentHandle<HelloAdminComponent>;
  let mockAccountGenerator, mockGeneratedKeypair;
  let mockFriendbot, mockFriendbotRequest: Subject<any>;

  /**
   * Test Setup
   */
  beforeEach(async(() => {
    /**
     * Mocks for the AccountGeneratorService.
     * Now just used to generate an ephemeral account..
     * Could also be used to create other new accounts, etc.
     */
    mockAccountGenerator = jasmine.createSpyObj('AccountGeneratorService', ['generateAccount']);
    mockGeneratedKeypair = { publicKey: 'hi!', privateKey: 'shh!' };
    mockAccountGenerator.generateAccount.and.returnValue(mockGeneratedKeypair);

    /**
     * Mocks for the FriendBotService
     */
    mockFriendbot = jasmine.createSpyObj('FriendBotService', ['requestFunds']);
    mockFriendbotRequest = new Subject();
    mockFriendbot.requestFunds.and.returnValue(mockFriendbotRequest);
    TestBed.configureTestingModule({
      declarations: [ HelloAdminComponent ],
      providers: [
        {provide: AccountGeneratorService, useValue: mockAccountGenerator},
        {provide: FriendbotService, useValue: mockFriendbot}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  /**
   * Initialize component
   */
  beforeEach(() => {
    const fixture = TestBed.createComponent(HelloAdminComponent);
    handle = new TestComponentHandle(fixture);
    handle.detectChanges();
    component = handle.componentInstance;
  });

  describe('.ngOnInit', () => {
    /**
     * Test the initial state of an admin account in an ephemeral network
     */
    describe('with an ephemeral network', () => {
      describe('when creating an admin account', () => {
        it('should call the account generator service', () => {
          expect(mockAccountGenerator.generateAccount).toHaveBeenCalled();
        });
        it('should store the account keys', () => {
          expect(component.ephemeralAdminAccount).toBe(mockGeneratedKeypair);
        });
      });
      describe('when determing admin account funds', () => {
        it('should set .adminFundState', () => {
          expect(component.adminFundState).toBe('unfunded');
        });
        it('should set .requestState', () => {
          expect(component.requestState).toBe('ready');
        });
      });
    });
  });

  /**
   * Test the request to send funds from FriendBot to the Admin
   */
  describe('.fundAdminAccount', () => {
    let mockFundResult;
    describe('when sending a request for funds,', () => {
      beforeEach(() => {
        component.fundAdminAccount();
        handle.detectChanges();
      });
      it('should set .adminFundState', () => {
        expect(component.adminFundState).toBe('unfunded');
      });
      describe('when calling the FriendBotService,', () => {
        it('should call .requestFunds', () => {
          expect(mockFriendbot.requestFunds).toHaveBeenCalledWith(component.ephemeralAdminAccount.publicKey);
        });
      });
    });
    describe('when responding to the request for funds,', () => {
      describe('when the request fails', () => {
        beforeEach(() => {
          mockFundResult = {oops: 'ohNo!'};
          component.fundAdminAccount();
          mockFriendbotRequest.error(mockFundResult);
          handle.detectChanges();
        });
        it('should set .requestState', () => {
          expect(component.requestState).toBe('error');
        });
      });
      describe('when the request is successful,', () => {
        beforeEach(() => {
          mockFundResult = {status: '200'};
          component.fundAdminAccount();
          mockFriendbotRequest.next(mockFundResult);
          handle.detectChanges();
        });
        it('should set .requestState', () => {
          expect(component.requestState).toBe('complete');
        });
        it('should set .adminFundState', () => {
          expect(component.adminFundState).toBe('funded');
        });
      });
    });
  });

  /**
   * Future-stuffz
   */
  describe('future specs / features', () => {
    describe('easy / short-term', () => {
      it('persistent accounts');
      it('creating multiple accounts');
      it('funding other accounts');
    });
  });
});
