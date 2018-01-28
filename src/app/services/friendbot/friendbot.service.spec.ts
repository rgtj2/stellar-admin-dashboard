import { HorizonApiService } from './../horizon-api/horizon-api.service';
import { TestBed, inject } from '@angular/core/testing';

import { FriendbotService } from './friendbot.service';

describe('FriendbotService', () => {
  let friendbotService: FriendbotService;
  let mockHorizonApiService;

  beforeEach(() => {
    /**
     * Mock the HorizonApiService
     * TODO: Custom methods as a layer on top of this ^?
     */
    mockHorizonApiService  = jasmine.createSpyObj('HorizonApi', ['post']);

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
    describe('sending a .post reqest to horizon', () => {
      it('should call with the proper params');
    });
    it('should return the request');
  });
});
