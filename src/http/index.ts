import 'cross-fetch/polyfill'

import * as queryString from 'query-string';

import {
  HTTPError,
} from '../exceptions';

import * as Types from '../types';

export default class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async get<T>(pathname: string, params?: any): Promise<T> {
    const requestURL = this.baseURL + pathname + '?' + queryString.stringify(params);

    let response: Response;
    try {
      response = await fetch(requestURL.toString());
    } catch(error) {
      throw Error(error);
    }

    if (!response.ok) {
      await this.handleError(response);
    }

    return response.json();
  }

  private handleError = async (response: Response) => {
    const json: Types.ErrorResponse = await response.json();

    switch(response.status) {
      case 400:
        throw new HTTPError(response.status, 'BAD_REQUEST', json);
      case 403:
        throw new HTTPError(response.status, 'FORBIDDEN', json);
      case 404:
        throw new HTTPError(response.status, 'NOT_FOUND', json);
      case 500:
        throw new HTTPError(response.status, 'INTERNAL_ERROR', json);
      default:
        throw new HTTPError(response.status, 'UNHANDLED_ERROR', json);
    }
  }
}
