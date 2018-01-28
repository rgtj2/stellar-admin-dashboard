import { QueryRunnerService } from './query-runner.service';

import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

describe('QueryRunnerService', () => {
  let mockHttpClient;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        QueryRunnerService,
        {provide: HttpClient, useValue: mockHttpClient}
      ]
    });
  });

  it('should be created', inject([QueryRunnerService], (service: QueryRunnerService) => {
    expect(service).toBeTruthy();
  }));

  describe('get', () => {});
  describe('post', () => {});
});
