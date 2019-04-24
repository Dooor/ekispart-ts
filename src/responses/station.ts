import * as Types from '../types';

interface IStationResponseInput {
  points: Types.Point[];
}
export class StationResponse {
  public points: Point[];

  constructor(input: IStationResponseInput) {
    this.points = input.points.map((point) => Point.fromJS(point));
  }

  public static fromJS = (json: Types.StationResponse) => {
    return new StationResponse({
      points: json['ResultSet']['Point'] || [],
    })
  }
}

interface IPointInput {
  station: Types.Station;
  prefecture: Types.Prefecture;
  geoPoint: Types.GeoPoint;
}
class Point {
  public station: Station;
  public prefecture: Prefecture;
  public geoPoint: GeoPoint;

  constructor(input: IPointInput) {
    this.station = Station.fromJS(input.station);
    this.prefecture = Prefecture.fromJS(input.prefecture);
    this.geoPoint = GeoPoint.fromJS(input.geoPoint);
  }
  public static fromJS = (json: Types.Point) => {
    return new Point({
      station: json['Station'],
      prefecture: json['Prefecture'],
      geoPoint: json['GeoPoint'],
    })
  }
}

interface IStatioinInput {
  name: string;
  type: string;
  yomi: string;
  code: string;
}
class Station {
  public name: string;
  public type: string;
  public yomi: string;
  public code: string;

  constructor(input: IStatioinInput) {
    this.name = input.name;
    this.type = input.type;
    this.yomi = input.yomi;
    this.code = input.code;
  }

  public static fromJS = (json: Types.Station): Station => {
    return new Station({
      name: json['Name'],
      type: json['Type'],
      yomi: json['Yomi'],
      code: json['code'],
    })
  }
}

interface IPrefectureInput {
  name: string;
  code: string;
}
class Prefecture {
  public name: string;
  public code: string;

  constructor(input: IPrefectureInput) {
    this.name = input.name;
    this.code = input.code;
  }

  public static fromJS = (json: Types.Prefecture): Prefecture => {
    return new Prefecture({
      name: json['Name'],
      code: json['code'],
    })
  }
}

interface IGeoPointInput {
  gcs: string;
  lati: string;
  lati_d: string;
  longi: string;
  longi_d: string;
}
class GeoPoint {
  public gcs: string;
  public lati: string;
  public lati_d: string;
  public longi: string;
  public longi_d: string;

  constructor(input: IGeoPointInput) {
    this.gcs = input.gcs;
    this.lati = input.lati;
    this.lati_d = input.lati_d;
    this.longi = input.longi;
    this.longi_d = input.longi_d;
  }

  public static fromJS = (json: Types.GeoPoint): GeoPoint => {
    return new GeoPoint({
      gcs: json['gcs'],
      lati: json['lati'],
      lati_d: json['lati_d'],
      longi: json['longi'],
      longi_d: json['longi_d'],
    })
  }
}
