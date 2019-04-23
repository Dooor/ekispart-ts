import HTTPClient from '../http';

import * as Types from '../types';

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

  public getStation = async (name: string): Promise<Types.StationResponse> => {
    const request = new HTTPClient(this.baseUrl);
    return request.get<Types.StationResponse>(this.stationPathname, { key: this.accessKey, name });
  }

  public getStationInfo = async (code: number, type: Types.StationInfoType): Promise<Types.StationInfoResponse> => {
    const request = new HTTPClient(this.baseUrl);
    return request.get<Types.StationInfoResponse>(this.stationInfoPathname, { key: this.accessKey, code, type });
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
