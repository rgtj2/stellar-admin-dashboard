import { StellarAccountDataResolveService } from './stellar-account-data-resolve.service';
import { StellarAccountService } from './../../../services/stellar-account/stellar-account.service';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { TestBed, inject } from '@angular/core/testing';

describe('StellarAccountDataResolveService', () => {
  let service: StellarAccountDataResolveService;
  let mockAccountService, mockAccountRequest;

  beforeEach(() => {
    /**
     * Mock the StellarAccountService
     */
    mockAccountService = jasmine.createSpyObj('StellarAccountService', ['byKey']);
    mockAccountRequest = new Subject();
    mockAccountService.byKey.and.returnValue(mockAccountRequest);

    TestBed.configureTestingModule({
      providers: [
        StellarAccountDataResolveService,
        {provide: StellarAccountService, useValue: mockAccountService}
      ]
    });
  });

  beforeEach(inject([StellarAccountDataResolveService], (s: StellarAccountDataResolveService) => {
    service = s;
  }));

  describe('.resolve', () => {
    describe('with route params', () => {
      describe('with publicKey', () => {
        let routeSnapshot, mockPublicKeyParam;
        let testRequest;
        beforeEach(() => {
          routeSnapshot = {
            data: jasmine.createSpyObj('RouteData', ['get'])
          };
          mockPublicKeyParam = 'GXXX';
          routeSnapshot.data.get.and.returnValue(mockPublicKeyParam);
          testRequest = service.resolve(<ActivatedRouteSnapshot> routeSnapshot);
        });
        describe('calling StellarAccountService', () => {
          it('should call .byKey', () => {
            expect(mockAccountService.byKey).toHaveBeenCalledWith(mockPublicKeyParam);
          });
          describe('with a successful response', () => {
            it('should return the result', () => {
              expect(testRequest).toBe(mockAccountRequest);
            });
          });
        });
      });
    });
  });
});
