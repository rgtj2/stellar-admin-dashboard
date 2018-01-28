import { NetworkEnvironmentService } from '../network-environment/network-environment.service';
import { QueryRunnerService } from './query-runner/query-runner.service';

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HorizonApiService {

  constructor(private queryRunner: QueryRunnerService,
              private network: NetworkEnvironmentService) {}

  public get(urlPath: string): Observable<any> {
    // TODO: Api Models + Serialization
    const url = this.network.horizonURL + urlPath;
    return this.queryRunner.get(url);
  }

  public post(urlPath: string, body = {}): Observable<any> {
    // TODO: Api Models + Serialization
    const url = this.network.horizonURL + urlPath;
    return this.queryRunner.post(url, body);
  }

}
