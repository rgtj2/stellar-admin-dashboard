import { QueryRunnerService } from './query-runner.service';

import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

describe('QueryRunnerService', () => {
  let service: QueryRunnerService;
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

  beforeEach(inject([QueryRunnerService], (s: QueryRunnerService) => {
    service = s;
  }));

  describe('get', () => {
    let mockUrl;
    beforeEach(() => {
      mockUrl = 'url';
      service.get(mockUrl);
    });
    it('should call .get on the query runner', () => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(mockUrl);
    });
  });
  describe('post', () => {
    let mockUrl, mockBody;
    beforeEach(() => {
      mockUrl = 'url';
      mockBody = {};
      service.post(mockUrl, mockBody);
    });
    it('should call .post on the query runner', () => {
      expect(mockHttpClient.post).toHaveBeenCalledWith(mockUrl, mockBody);
    });
  });
});
