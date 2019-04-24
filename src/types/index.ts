export interface IClientConfig {
  accessKey: string;
  format: ResponseFormatType;
}

export type ResponseFormatType = 'json' | 'xml';

export type Station = {
  code: string;
  Name: string;
  Type: string;
  Yomi: string;
}

export type Prefecture = {
  code: string;
  Name: string;
}

export type GeoPoint = {
  longi: string;
  lati: string;
  longi_d: string;
  lati_d: string;
  gcs: string;
}

export type Point = {
  Station: Station;
  Prefecture: Prefecture;
  GeoPoint: GeoPoint;
}

export type Corporation = {
  Name: string;
}

export type Line = {
  Color: string;
  Name: string;
  Type: {
    text: string;
    detail: string;
  } | string;
  corporationIndex: string;
}

export type WelfareFacility = {
  Name: string;
  Comment: string;
}

export type Exit = {
  Comment: string;
  Name: string;
}

export type ErrorResponse = {
  ResultSet: {
    apiVersion: string;
    engineVersion: string;
    Error: {
      Message: string;
      code: string;
    }
  }
}

export type StationInformation = {
  Corporation?: Corporation[];
  Line?: Line[];
  WelfareFacilities?: WelfareFacility[]
  Exit?: Exit[];
  Type: StationInfoType;
}

export type StationResponse = {
  ResultSet: {
    apiVersion: string;
    engineVersion: string;
    max: string;
    offset: string;
    Point?: Point[];
  }
}

export type StationInfoType = 'rail' | 'nearrail' | 'welfare' | 'exit';

export type StationInfoResponse = {
  ResultSet: {
    apiVersion: string;
    engineVersion: string;
    Information: StationInformation;
  }
}


