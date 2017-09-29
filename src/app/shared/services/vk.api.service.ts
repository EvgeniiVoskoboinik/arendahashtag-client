import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

import {CountriesReq, VkCountry} from '../interfaces';
import {AdState, AdStateItem} from '../redux/interfaces';

export const VK_API_VERSION = 6.68;

@Injectable()
export class VkApiService{

  constructor(private http: Http) {

  }

  getCountries(params: CountriesReq): Observable<VkCountry> {
    return VK.Api.call('database.getCountries', params, data => {
        return Observable.of(data.response);
    });
  }

  createSearchQuery(adState: AdState): string {
    let queryArr = ['#arendahashtag'];

    Object.keys(adState).forEach(key => {});

    return queryArr.join(' ');
  }
  createWallPostMessage(adState: AdState): string {
    let tags: string = Object.keys(adState)
      .map(key => adState[key])
      .filter(Array.isArray)
      .map(x => x[0])
      .filter(x => x.tag != null)
      .map(x => x.tag)
      .join(' ');

    return `${adState.description}

#arendahashtag ${tags}`;
  }

  static createCityHashtag(city: AdStateItem): string {
    const ID_PREFIX = 'cid';
    let title = city.title.replace(/[-()\s]/gi, '');
    return `#${ID_PREFIX + city.id} #${title}`;
  }
}
