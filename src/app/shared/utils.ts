import {
  Injectable,
} from '@angular/core';
import {Location} from '@angular/common';
import {Router, UrlSerializer, NavigationExtras, Params} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {DropdownItem} from './dropdown/dropdown-item';
import {URLBuilder} from './url-builder';

export interface EnumNameValue {
  name: string;
  value: number;
}

@Injectable()
export class Utils {

  constructor(
    private router: Router,
    private urlSerializer: UrlSerializer,
    private location: Location,
  ) {
  }

  public removeFast(m: any[], index: number) {
    if (index < 0 || index >= m.length) {
      throw 'IndexOutOfBoundException: ' + index;
    }

    m[index] = m[m.length - 1];
    m.length--;
  }

  public combineUrl(base: string, relative: string): string {
    if (base == null || base.length === 0) {
      return relative;
    }
    let result = base;
    if (relative == null || relative.length === 0) {
      return result;
    }
    if (result[result.length - 1] !== '/' && relative[0] !== '/') {
      result += '/';
    }
    if (result[result.length - 1] === '/' && relative[0] === '/') {
      result += relative.slice(1);
    } else {
      result += relative;
    }
    return result;
  }
  public combineUrls(...parts: string[]): string {
    return parts.reduce((s1: string, s2: string) => this.combineUrl(s1, s2));
  }

  public saveFromURI(uri: string, filename: string = '') {
    let link = document.createElement('a');
    link.href = uri;
    link.target = '_blank';
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }

  public getAbsoluteUrl(commands: any[], navigationExtras?: NavigationExtras): string {
    let tree = this.router.createUrlTree(commands, navigationExtras);
    let url = this.urlSerializer.serialize(tree);
    return this.location.prepareExternalUrl(url);
  }
  public openInNewWindow(commands: any[], navigationExtras?: NavigationExtras, focus: boolean = false) {
    let url = this.getAbsoluteUrl(commands, navigationExtras);

    let win = window.open(url, '_blank');
    if (focus) {
      win.focus();
    }
  }

  public getEnumNames(enumeration: any): string[] {
    return Object.keys(enumeration).map(k => enumeration[k]).filter(x => typeof x === 'string');
  }
  public getEnumValues(enumeration: any): number[] {
    return this.getEnumNames(enumeration).map(name => enumeration[name]);
  }
  public getEnumNameValues(enumeration: any): EnumNameValue[] {
    return this.getEnumNames(enumeration).map(name => ({name: name, value: enumeration[name]}));
  }
  public dropdownItemsFromEnum(enumeration: any): DropdownItem[] {
    return this.getEnumNames(enumeration).map(name => ({title: name, id: enumeration[name]}));
  }
  public getStrEnumNames(enumeration: any): string[] {
    return Object.keys(enumeration);
  }
  public getStrEnumValues(enumeration: any): string[] {
    return this.getStrEnumNames(enumeration).map(name => enumeration[name]);
  }
  public getStrEnumNameValues(enumeration: any): EnumNameValue[] {
    return this.getStrEnumNames(enumeration).map(name => ({name: name, value: enumeration[name]}));
  }

  public updateQueryParamter(url: string, key: string, value?: string) {
    let re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi');

    if (re.test(url)) {
      if (typeof value !== 'undefined' && value !== null) {
        return url.replace(re, '$1' + key + '=' + value + '$2$3');
      } else {
        let hash = url.split('#');
        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
          url += '#' + hash[1];
        }
        return url;
      }
    } else {
      if (typeof value !== 'undefined' && value !== null) {
        let separator = url.includes('?') ? '&' : '?';
        let hash = url.split('#');
        url = hash[0] + separator + key + '=' + value;
        if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
          url += '#' + hash[1];
        }
        return url;
      } else {
        return url;
      }
    }
  }

  public updateQueryParamters(params: URLBuilder, extras?: NavigationExtras) {
    let queryParams = this.queryParamsFromSearchParams(params.result());
    this.router.navigate([], Object.assign({}, extras || {}, {queryParams}));
  }
  public queryParamsFromSearchParams(params: URLSearchParams): {[index: string]: string} {
    return Array.from(params.paramsMap.entries()).reduce((acc, pair) => {
      let [key, values] = pair;
      if (!values || !values.length) {
        return acc;
      }

      if (values.length === 1) {
        acc[key] = values[0];
      } else {
        acc[key] = values;
      }

      return acc;
    }, {});
  }

  public copyAndDecodeQueryParams(params: Params): Params {
    let result: Params = {};
    if (!params) {
      return result;
    }

    Object.keys(params).forEach(key => {
      let value = params[key];

      if (Array.isArray(value)) {
        result[key] = (<any[]>value).map(decodeURIComponent);
      } else {
        result[key] = decodeURIComponent(value);
      }
    });

    return result;
  }

  public alphaNumCompare(a: string, b: string): number {
    function chunkify(t: string) {
      let tz = [];
      let x = 0, y = -1, n = null, i, j;

      while (i = (j = t.charAt(x++)).charCodeAt(0)) {
        let m = (i === 46 || (i >= 48 && i <= 57));
        if (m !== n) {
          tz[++y] = '';
          n = m;
        }
        tz[y] += j;
      }
      return tz;
    }

    let aa = chunkify(a);
    let bb = chunkify(b);

    for (let x = 0; aa[x] && bb[x]; x++) {
      if (aa[x] !== bb[x]) {
        let c = Number(aa[x]), d = Number(bb[x]);
        if (c === aa[x] && d === bb[x]) {
          return c - d;
        } else {
          return (aa[x] > bb[x]) ? 1 : -1;
        }
      }
    }
    return aa.length - bb.length;
  }

  public removeIf<T>(m: T[], predicate: (e: T) => boolean) {
    let p = 0;

    for (let i = 0; i < m.length; i++) {
      if (!predicate(m[i])) {
        if (p < i) {
          m[p] = m[i];
        }

        p++;
      }
    }

    if (p < m.length) {
      m.length -= (m.length - p);
    }
  }

  public randomString(): string {
    let randomIndex = Math.floor(Math.random() * (randomStrings.length - 1 + 1));
    return randomStrings[randomIndex];
  }
}

const randomStrings = [
  'To keep your secret is wisdom; but to expect others to keep it is folly.',
  'Experience is the teacher of fools.',
  'Nothing at times is more expressive than silence.',
  'Poets are people who can still see the world through the eyes of children.',
  'Information is not knowledge.',
  'Before everything else, getting ready is the secret of success.',
  'All cats are gray in the dark.',
  'No one keeps a secret so well as a child.',
  'He who has achieved success has worked well, laughed often and loved much.',
  'As long as people believe in absurdities, they will continue to commit atrocities.',
  'Nothing is permanent but change.',
  'Some virtues are seen only in affliction and others only in prosperity.',
  'Liberty is the right to do what the law permits.',
];
