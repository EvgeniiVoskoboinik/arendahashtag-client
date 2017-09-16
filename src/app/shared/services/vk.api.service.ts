import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

import {CountriesReq, VkCountry, CitiesReq, VkCity} from '../interfaces';

@Injectable()
export class VkApiService{

  constructor(private http: Http) {

  }

  getCountries(params: CountriesReq): Observable<VkCountry> {
    return VK.Api.call('database.getCountries', params, data => {
        return Observable.of(data.response);
    });
  }

  getCities(params: CitiesReq): Observable<VkCity[]> {
    return VK.Api.call('database.getCities', params, data => {
      return Observable.of(data.response);
    });
  }

}
