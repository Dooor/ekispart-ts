import HTTPClient from '../http';

import * as Types from '../types';

import {
  StationResponse,
  StationInfoResponse,
} from '../responses';

export default class Client {
  private accessKey: string;
  private format: Types.ResponseFormatType;
  private endpoint: string = 'api.ekispert.jp';
  private version: string = 'v1';

  constructor(config: Types.IClientConfig) {
    if (!config.accessKey) {
      throw new Error('not provided ekispart access key');
    }

    this.accessKey = config.accessKey;
    this.format = config.format;
  }

  public getStation = async (name: string): Promise<StationResponse> => {
    const request = new HTTPClient(this.baseUrl);
    const response = await request.get<Types.StationResponse>(this.stationPathname, { key: this.accessKey, name })
    return StationResponse.fromJS(response);
  }

  public getStationInfo = async (code: number, type: Types.StationInfoType): Promise<StationInfoResponse> => {
    const request = new HTTPClient(this.baseUrl);
    const response = await request.get<Types.StationInfoResponse>(this.stationInfoPathname, { key: this.accessKey, code, type });
    return StationInfoResponse.fromJS(response);
  }

  private get stationInfoPathname(): string {
    return `/${this.version}/${this.format}/station/info`;
  }

  private get stationPathname(): string {
    return `/${this.version}/${this.format}/station`;
  }

  private get baseUrl(): string {
    return `https://${this.endpoint}`;
  }
}
