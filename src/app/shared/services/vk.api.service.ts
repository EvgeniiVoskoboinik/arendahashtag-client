import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

import {CountriesReq, VkCountry, CitiesReq, VkCity} from '../interfaces';
import {AdState} from '../redux/interfaces';

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

  createSearchQuery(adState: AdState): string {
    let queryArr = ['#arendahashtag'];

    Object.keys(adState).forEach(key => {
      console.log(key, adState[key]);
    });

    return queryArr.join(' ');
  }

}
