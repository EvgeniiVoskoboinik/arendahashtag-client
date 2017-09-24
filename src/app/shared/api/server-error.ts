import {Response} from '@angular/http';

const COMMON_ERROR_KEY = 'Unexpected error occurred, please contact the administrator';
const TIMEOUT_ERROR_HTTP_STATUS = 504;

export class ServerError {
  static DEFAULT = new ServerError(COMMON_ERROR_KEY);

  constructor(
    public readonly key: string,
    public readonly code: number = -1,
    public readonly details?: string,
  ) {

    this.details = details || '';
  }

  toString(): string {
    return `${this.key}\n${this.details}`;
  }

  static fromString(error: string): ServerError {
    return new ServerError(COMMON_ERROR_KEY, -1, error);
  }
  static fromError(error: Error): ServerError {
    if (!error) {
      return ServerError.DEFAULT;
    }

    return new ServerError(error.message, -1);
  }
  static fromResponse(response: Response): ServerError {
    if (!response) {
      return ServerError.DEFAULT;
    }

    if (response.status === TIMEOUT_ERROR_HTTP_STATUS) {
      return new ServerError('Operation timed out', response.status);
    }

    try {
      let error = response.json();
      return new ServerError(error.message || COMMON_ERROR_KEY, response.status, error.details);
    } catch (ex) {
    }

    return new ServerError(COMMON_ERROR_KEY, response.status);
  }

  static from(error: Error | Response): ServerError {
    if (error instanceof Error) {
      return ServerError.fromError(error);
    } else if (error instanceof Response) {
      return ServerError.fromResponse(error);
    } else {
      return ServerError.DEFAULT;
    }
  }
}
