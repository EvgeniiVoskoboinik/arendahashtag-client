import {URLSearchParams, QueryEncoder} from '@angular/http';

class CustomEncoder extends QueryEncoder {
  private customEncoding(v: string): string {
    return encodeURIComponent(v)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/gi, '$')
      .replace(/%2C/gi, ',')
      .replace(/%3B/gi, ';')
      // .replace(/%2B/gi, '+') // hack to handle contentIds with 'plus' char, but this won't work with http.get(), as inside it makes a clone of the original URLSearchParams object, which creates a new (default) QueryEncoder. Fixed in new angular version
      .replace(/%3D/gi, '=')
      .replace(/%3F/gi, '?')
      .replace(/%2F/gi, '/');
  }
  encodeKey(k: string): string {
    return this.customEncoding(k);
  }
  encodeValue(v: string): string {
    return this.customEncoding(v);
  }
}

export class URLBuilder {

  private params: URLSearchParams;

  constructor(params?: URLSearchParams | URLBuilder | {[index: string]: any}) {
    this.params = new URLSearchParams('', new CustomEncoder());

    if (params) {
      this.setAll(params);
    }
  }

  public setIfNonNull(key: string, value: any): URLBuilder {
    if (value != null) {
      this.set(key, value);
    }

    return this;
  }

  public setIfNonEmpty(key: string, value: string | number): URLBuilder {
    if (value) {
      this.set(key, value);
    }

    return this;
  }

  /**
   * Converts input to string.
   * Recognises arrays and handles them appropriately.
   */
  public set(key: string, value: any): URLBuilder {
    if (value == null) {
      value = '';
    }

    if (Array.isArray(value)) {
      return this.setArray(key, value);
    }

    if (typeof value !== 'string') {
      value = value.toString();
    }
    this.params.set(key, value);

    return this;
  }

  /**
   * Will use empty string as value if no values provided
   */
  private setArray(key: string, values: any[]): URLBuilder {
    values = values || [];

    this.params.delete(key);

    if (values.length) {
      values.forEach(value => {
        this.params.append(key, value);
      });
    } else {
      this.params.append(key, '');
    }

    return this;
  }
  public setIfNonEmptyArray(key: string, values: any[]): URLBuilder {
    if (!values || !values.length) {
      return this;
    }

    this.setArray(key, values);

    return this;
  }

  public setAll(searchParams: URLSearchParams | URLBuilder | {[index: string]: any}): URLBuilder {
    if (!searchParams) {
      return this;
    }

    if (searchParams instanceof URLBuilder) {
      this.setAll(searchParams.result());
    } else if (searchParams instanceof URLSearchParams) {
      Array.from(searchParams.paramsMap.entries()).forEach((pair: [string, any[]]) => {
        let [key, values] = pair;
        this.set(key, values);
      });
    } else {
      Object.keys(searchParams).forEach(key => {
        this.setIfNonNull(key, searchParams[key]);
      });
    }

    return this;
  }

  public appendIfNonNull(key: string, value: any): URLBuilder {
    if (value != null) {
      this.append(key, value);
    }

    return this;
  }

  /**
   * Converts input to string.
   * Recognises arrays and handles them appropriately.
   */
  public append(key: string, value: any): URLBuilder {
    if (value == null) {
      value = '';
    }

    if (Array.isArray(value)) {
      return this.appendArray(key, value);
    }

    if (typeof value !== 'string') {
      value = value.toString();
    }
    this.params.append(key, value);

    return this;
  }
  /**
   * Will use empty string as value if no values provided
   */
  private appendArray(key: string, values: any[]): URLBuilder {
    values = values || [];

    if (values.length) {
      values.forEach(value => {
        this.params.append(key, value);
      });
    } else {
      this.params.append(key, '');
    }

    return this;
  }

  public appendAll(searchParams: URLSearchParams | URLBuilder): URLBuilder {
    if (!searchParams) {
      return this;
    }

    if (searchParams instanceof URLBuilder) {
      this.appendAll(searchParams.result());
    } else if (searchParams instanceof URLSearchParams) {
      Array.from(searchParams.paramsMap.entries()).forEach((pair: [string, any[]]) => {
        let [key, values] = pair;
        this.appendIfNonNull(key, values);
      });
    }

    return this;
  }

  public result(): URLSearchParams {
    return this.params;
  }

  public toString(): string {
    return this.params.toString();
  }
}
