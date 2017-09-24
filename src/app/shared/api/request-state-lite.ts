import {ServerError} from './server-error';

export class RequestStateLite {
  loading: boolean;
  error: ServerError;
  done = false;

  get errorKey(): string {
    return this.error && this.error.key;
  }
  set errorKey(key: string) {
    this.error = new ServerError(key, -1);
  }

  get success(): boolean {
    return !this.loading && !this.error;
  }
}
