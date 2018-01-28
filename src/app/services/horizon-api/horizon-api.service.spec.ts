import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { HorizonApiService } from './horizon-api.service';
import { HORIZON_URL } from '../injection-tokens';

describe('HorizonApiService', () => {
  let horizonApiService: HorizonApiService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('Http', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        HorizonApiService,
        {provide: HttpClient, useValue: mockHttp},
        {provide: HORIZON_URL, useValue: 'myserver.url'}
      ]
    });
  });

  beforeEach(inject([HorizonApiService], (s: HorizonApiService) => {
    horizonApiService = s;
  }));

  // TODO: move this to a query runner service
  // TODO: Add typed endpoints and composable query params
  describe('get', () => {});
  describe('post', () => {});
});
