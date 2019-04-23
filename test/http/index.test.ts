import 'jest-fetch-mock';

import HttpClient from '../../src/http';
import { HTTPError } from '../../src/exceptions';

const BASE_URL = 'https://api.ekispert.jp'

describe('HttpClient', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('#get', () => {
    test('throw BadRequest Error when status code 400', () => {
      const body = JSON.stringify({
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "",
          Error: {
            code: "W400",
            Message: "BAD_REQUEST"
          }
        }
      });
      const init = { status: 400, statusText: 'NG' };
      fetchMock.mockResponseOnce(body, init);

      const http = new HttpClient(BASE_URL);
      expect(() => http.get('/').catch((error) => expect(error).toBeInstanceOf(HTTPError)));
    })

    test('throw Forbidden Error when status code 403', () => {
      const body = JSON.stringify({
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "",
          Error: {
            code: "w403",
            Message: "FORBIDDEN"
          }
        }
      });
      const init = { status: 403, statusText: 'NG' };
      fetchMock.mockResponseOnce(body, init);

      const http = new HttpClient(BASE_URL);
      expect(() => http.get('/').catch((error) => expect(error).toBeInstanceOf(HTTPError)));
    })

    test('throw Forbidden Error when status code 404', () => {
      const body = JSON.stringify({
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "",
          Error: {
            code: "w404",
            Message: "NOT_FOUND"
          }
        }
      });
      const init = { status: 404, statusText: 'NG' };
      fetchMock.mockResponseOnce(body, init);

      const http = new HttpClient(BASE_URL);
      expect(() => http.get('/').catch((error) => expect(error).toBeInstanceOf(HTTPError)));
    })

    test('throw Internal Server Error when status code 500', () => {
      const body = JSON.stringify({
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "",
          Error: {
            code: "w500",
            Message: "INTERNAL_ERROR"
          }
        }
      });
      const init = { status: 500, statusText: 'NG' };
      fetchMock.mockResponseOnce(body, init);

      const http = new HttpClient(BASE_URL);
      expect(() => http.get('/').catch((error) => expect(error).toBeInstanceOf(HTTPError)));
    })
  })
})
