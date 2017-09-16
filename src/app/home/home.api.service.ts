import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ApiEndpoints} from '../shared/endpoints';
import {Observable} from 'rxjs';
import {URLBuilder} from '../shared/url-builder';

@Injectable()
export class HomeApiService{
  constructor(
    private http: Http,
  ) {

  }

  post(body: any): Observable<any> {
    return this.http.post(ApiEndpoints.post, body)
      .map(res => res.json());
  }

  find(req: any): Observable<any> {
      let params = new URLBuilder(req);
    return this.http.get(ApiEndpoints.find, {search: params.result()})
      .map(res => res.json());
  }
}
