import { HorizonApiService } from './horizon-api.service';
import { NetworkEnvironmentService } from '../network-environment/network-environment.service';
import { QueryRunnerService } from './query-runner/query-runner.service';

import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

describe('HorizonApiService', () => {
  let horizonApiService: HorizonApiService;
  let mockNetworkEnvironment;
  let mockQueryRunner;

  beforeEach(() => {
    mockNetworkEnvironment = jasmine.createSpyObj('NetworkEnvironment', ['horizonURL']);
    mockQueryRunner = jasmine.createSpyObj('QueryRunner', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        HorizonApiService,
        {providers: NetworkEnvironmentService, useValue: mockNetworkEnvironment},
        {providers: QueryRunnerService, useValue: mockQueryRunner}
      ]
    });
  });

  beforeEach(inject([HorizonApiService], (s: HorizonApiService) => {
    horizonApiService = s;
  }));

  // TODO: Add typed endpoints and composable query params
});
