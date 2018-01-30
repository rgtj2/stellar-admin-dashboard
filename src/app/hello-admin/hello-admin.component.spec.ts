/**
 * App-related services / components / etc
 */
import { FriendbotService } from './../services/horizon-api/friendbot/friendbot.service';
import { HelloAdminComponent } from './hello-admin.component';
import { NetworkEnvironmentService } from '../services/network-environment/network-environment.service';
import { StellarAccountGeneratorService } from '../services/stellar-account/stellar-account-generator/stellar-account-generator.service';
import { TestComponentHandle } from './../utilties/testing/test-component-handle/test-component-handle';

/**
 * System / libraries
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// TODO: Fix tests disconnecting
xdescribe('HelloAdminComponent', () => {
  /**
   * Mocks / helpers used accross all tests
   */
  let component: HelloAdminComponent;
  let handle: TestComponentHandle<HelloAdminComponent>;
  let mockAccountGenerator, mockGeneratedKeypair;
  let mockFriendbot, mockFriendbotRequest: Subject<any>;
  let mockNetworkEnvironment;
  let mockRouter;

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

    /**
     * Mocks for NetworkEnvironmentService
     */
    mockNetworkEnvironment = {
      horizonConfig: {
        friendbotIsEnabled: true, networkIsPersistent: false
      }
    };

    /**
     * Mock Router
     */
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ HelloAdminComponent ],
      providers: [
        {provide: StellarAccountGeneratorService, useValue: mockAccountGenerator},
        {provide: FriendbotService, useValue: mockFriendbot},
        {provide: NetworkEnvironmentService, useValue: mockNetworkEnvironment},
        {provide: Router, useValue: mockRouter}
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
     * The initial state of an admin account in an ephemeral network
     */
    describe('with an ephemeral network', () => {
      describe('when creating an keyPair', () => {
        it('should call the Stellar account generator service', () => {
          expect(mockAccountGenerator.generateAccount).toHaveBeenCalled();
        });
        it('should store the account keypair', () => {
          expect(component.keypair).toBe(mockGeneratedKeypair);
        });
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
   * The request to send funds from FriendBot to the Admin
   */
  describe('.fundAdminAccount', () => {
    let mockFundResult;
    describe('when sending a request for funds,', () => {
      beforeEach(() => {
        component.fundAdminAccount();
        handle.detectChanges();
      });
      it('should set .requestState', () => {
        expect(component.requestState).toBe('waiting');
      });
      describe('when calling the FriendBotService,', () => {
        it('should call .requestFunds', () => {
          expect(mockFriendbot.requestFunds).toHaveBeenCalledWith(component.keypair.publicKey);
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
   * Test the template and its interactions
   */
  describe('template', () => {
    describe('when the admin account is unfunded', () => {
      describe('when the friendbot is enabled', () => {
        describe('with a request funds button', () => {
          let requestFundsButton, expectedButtonText;
          beforeEach(() => {
            expectedButtonText = 'Fund Admin Account';
            requestFundsButton = handle.debugElement.query(By.css('.friendbot-request'));
          });
          it('should exist on the page', () => {
            expect(requestFundsButton.nativeElement.innerHTML).toContain(expectedButtonText);
          });
          describe('when clicked', () => {
            beforeEach(() => {
              requestFundsButton.nativeElement.click();
              handle.detectChanges();
            });
            it('should call .fundAdminAccount', () => {
              expect(mockFriendbot.requestFunds).toHaveBeenCalled();
            });
            describe('when indicating the request state', () => {
              let requestIndicatorText, expectedIndicatorText;
              beforeEach(() => {
                expectedIndicatorText = 'Requesting funds...';
                requestIndicatorText = handle.debugElement.query(By.css('.request-state'));
              });
              it('should show a message while loading', () => {
                expect(requestIndicatorText.nativeElement.innerHTML).toContain(expectedIndicatorText);
              });
            });
            describe('with a successful response', () => {
              let accountGlimpse;
              beforeEach(() => {
                mockFriendbotRequest.next({status: 200});
                handle.detectChanges();
                accountGlimpse = handle.debugElement.query(By.css('app-account-glimpse'));
              });
              it('should navigate to the account detail route', () => {
                expect(mockRouter.navigate).toHaveBeenCalledWith(['accounts', component.keypair.publicKey]);
              });
            });
            describe('with a failed response', () => {
              let requestIndicatorText, expectedIndicatorText;
              beforeEach(() => {
                expectedIndicatorText = 'Something went wrong..';
                mockFriendbotRequest.error({status: 400});
                handle.detectChanges();
                requestIndicatorText = handle.debugElement.query(By.css('.request-state'));
              });
              it('should show an error message', () => {
                expect(requestIndicatorText.nativeElement.innerHTML).toContain(expectedIndicatorText);
              });
            });
          });
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
