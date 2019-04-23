import * as Types from '../types';

export class HTTPError extends Error {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public originalResponse: Types.ErrorResponse,
  ) {
    super(originalResponse['ResultSet']['Error']['Message']);
  }
}
