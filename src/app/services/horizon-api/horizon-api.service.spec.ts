import { HorizonApiService } from './horizon-api.service';
import { NetworkEnvironmentService } from '../network-environment/network-environment.service';
import { QueryRunnerService } from './query-runner/query-runner.service';

import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

describe('HorizonApiService', () => {
  let horizonApiService: HorizonApiService;
  let mockNetworkEnvironment;
  let mockQueryRunner, mockRequest;

  beforeEach(() => {
    mockNetworkEnvironment = {horizonConfig: {url: 'test.horizon.url'}};
    mockQueryRunner = jasmine.createSpyObj('QueryRunner', ['get', 'post']);
    mockRequest = new Subject();
    mockQueryRunner.get.and.returnValue(mockRequest);
    mockQueryRunner.post.and.returnValue(mockRequest);

    TestBed.configureTestingModule({
      providers: [
        HorizonApiService,
        {provide: NetworkEnvironmentService, useValue: mockNetworkEnvironment},
        {provide: QueryRunnerService, useValue: mockQueryRunner}
      ]
    });
  });

  beforeEach(inject([HorizonApiService], (s: HorizonApiService) => {
    horizonApiService = s;
  }));

  // TODO: Add typed endpoints and composable query params
  describe('.get', () => {
    const mockUrlPath = '/endpoint/?params=1';
    let mockResponse, mockResult;
    beforeEach(() => {
      horizonApiService.get(mockUrlPath).subscribe((r) => {
        mockResponse = r;
      });
      mockResult = {};
      mockRequest.next(mockResult);
    });
    describe('when calling the query runner', () => {
      it('should call .get', () => {
        expect(mockQueryRunner.get).toHaveBeenCalled();
      });
      it('should use the horizon url and the given path', () => {
        const call = mockQueryRunner.get.calls.mostRecent();
        const urlArgument = call.args[0];
        expect(urlArgument).toBe(mockNetworkEnvironment.horizonConfig.url + mockUrlPath);
      });
    });
    it('should return the query runner\'s request', () => {
      expect(mockResponse).toBe(mockResult);
    });
  });

  describe('.post', () => {
    const mockUrlPath = '/endpoint/?params=1';
    const mockUrlBody = {};
    let mockResponse, mockResult;
    beforeEach(() => {
      horizonApiService.post(mockUrlPath, mockUrlBody).subscribe((r) => {
        mockResponse = r;
      });
      mockResult = {};
      mockRequest.next(mockResult);
    });
    describe('when calling the query runner', () => {
      it('should call .post', () => {
        expect(mockQueryRunner.post).toHaveBeenCalled();
      });
      describe('when passing arguments to .post', () => {
        let call, urlArgument, bodyArgument;
        beforeEach(() => {
          call = mockQueryRunner.post.calls.mostRecent();
          urlArgument = call.args[0];
          bodyArgument = call.args[1];
        });
        it('should build the proper url', () => {
          expect(urlArgument).toBe(mockNetworkEnvironment.horizonConfig.url + mockUrlPath);
        });
        it('should use the proper body', () => {
          expect(bodyArgument).toBe(mockUrlBody);
        });
      });
    });
    it('should return the query runner\'s request', () => {
      expect(mockResponse).toBe(mockResult);
    });
  });
});
