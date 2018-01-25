import { HORIZON_URL } from './../injection-tokens';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HorizonApiService {

  constructor(private http: Http,
              @Inject(HORIZON_URL) private horizonBaseUrl: string) {}


  public get(urlPath: string): Observable<any> {
    return this.http.get(this.horizonBaseUrl + urlPath);
  }

  public post(urlPath: string, body = {}): Observable<any> {
    return this.http.post(this.horizonBaseUrl + urlPath, body);
  }

}
