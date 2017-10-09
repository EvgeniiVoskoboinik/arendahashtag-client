import {Injectable} from '@angular/core';
import {AdState, AdStateItem} from '../redux/interfaces';

export const VK_API_VERSION = 5.68;

@Injectable()
export class VkApiService{

  constructor() {}

  createSearchQuery(adState: AdState): string {
    return this.createHashtagString(adState);
  }
  createWallPostMessage(adState: AdState): string {
    let tags = this.createHashtagString(adState);

    return `${adState.description}

${tags}`;
  }

  private createHashtagString(adState: AdState): string {
    let tags: string = Object.keys(adState)
      .map(key => adState[key])
      .filter(Array.isArray)
      .map(x => x[0])
      .filter(x => x.tag != null)
      .map(x => x.tag)
      .join(' ');

    return `#arendahashtag ${tags}`;
  }

  static createCityHashtag(city: AdStateItem): string {
    const ID_PREFIX = 'cid';
    let title = city.title.replace(/[-()\s]/gi, '');

    //TODO: return when get many users
    // return `#${ID_PREFIX + city.id} #${title}`;
    return `#${title}`;
  }
}
