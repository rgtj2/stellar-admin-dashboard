import { FriendbotService } from './friendbot.service';
import { HorizonApiService } from './../horizon-api/horizon-api.service';

import { Subject } from 'rxjs/Subject';
import { TestBed, inject } from '@angular/core/testing';

describe('FriendbotService', () => {
  let friendbotService: FriendbotService;
  let mockHorizonApiService, mockRequest;

  beforeEach(() => {
    /**
     * Mock the HorizonApiService
     */
    mockHorizonApiService  = jasmine.createSpyObj('HorizonApi', ['post']);
    mockRequest = new Subject();
    mockHorizonApiService.post.and.returnValue(mockRequest);

    TestBed.configureTestingModule({
      providers: [
        FriendbotService,
        {provide: HorizonApiService, useValue: mockHorizonApiService}
      ]
    });
  });

  beforeEach(inject([FriendbotService], (s: FriendbotService) => {
    friendbotService = s;
  }));

  describe('requestFunds', () => {
    const mockAccountPublicKey = 'Hi!!';
    let mockResponse, mockResult;
    beforeEach(() => {
      friendbotService.requestFunds(mockAccountPublicKey).subscribe((r) => {
        mockResult = r;
      });
      mockResponse = {};
      mockRequest.next(mockResponse);
    });
    describe('sending a .post reqest to horizon', () => {
      it('should call with the proper params', () => {
        expect(mockHorizonApiService.post).toHaveBeenCalledWith(`/friendbot/?addr=${mockAccountPublicKey}`);
      });
    });
    it('should return the request\'s response', () => {
      expect(mockResult).toBe(mockResponse);
    });
  });
});
