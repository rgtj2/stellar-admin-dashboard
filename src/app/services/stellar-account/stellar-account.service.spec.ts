import { StellarAccountData } from './../../shared/models/stellar-account/stellar-account-data';
import { HorizonApiService } from './../horizon-api/horizon-api.service';
import { StellarAccountService } from './stellar-account.service';

import { Subject } from 'rxjs/Subject';
import { TestBed, inject } from '@angular/core/testing';

describe('StellarAccountService', () => {
  let service: StellarAccountService;
  let mockHorizonApi, mockRequestSubject;

  beforeEach(() => {
    mockHorizonApi = jasmine.createSpyObj('HorizonApiService', ['get']);
    mockRequestSubject = new Subject();
    mockHorizonApi.get.and.returnValue(mockRequestSubject);
    TestBed.configureTestingModule({
      providers: [
        StellarAccountService,
        {provide: HorizonApiService, useValue: mockHorizonApi}
      ]
    });
  });

  beforeEach(inject([StellarAccountService], (s: StellarAccountService) => {
    service = s;
  }));

  describe('.byKey', () => {
    const mockPublicKey = 'GXXX';
    let mockRequest, mockResult;
    beforeEach(() => {
      mockRequest = service.byKey(mockPublicKey).subscribe((r) => {
        mockResult = r;
      });
      mockRequestSubject.next({signers: [], balances: [], account_id: null});
    });
    it('should call HorizonApiService.get', () => {
      expect(mockHorizonApi.get).toHaveBeenCalledWith(`/accounts/${mockPublicKey}`);
    });
    it('should return an observable with stellar account data', () => {
      expect(mockResult instanceof StellarAccountData).toBe(true);
    });
  });
});
