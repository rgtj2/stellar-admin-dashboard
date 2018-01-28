import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QueryRunnerService {

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<{}> {
    return this.http.get(url);
  }

  public post(url: string, body: {}): Observable<{}> {
    return this.http.post(url, body);
  }

}
