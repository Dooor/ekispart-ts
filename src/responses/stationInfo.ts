import * as Types from '../types';

interface IStationResponseInput {
  stationImformation: Types.StationInformation;
}
export class StationInfoResponse {
  public stationImformation: StationInformation;

  constructor(input: IStationResponseInput) {
    this.stationImformation = StationInformation.fromJS(input.stationImformation);
  }

  public static fromJS = (json: Types.StationInfoResponse) => {
    return new StationInfoResponse({
      stationImformation: json['ResultSet']['Information'],
    })
  }
}

interface IStationInformationInput {
  corporations: Types.Corporation[];
  exits: Types.Exit[];
  lines: Types.Line[];
  type: Types.StationInfoType;
  welfareFacilities: Types.WelfareFacility[];
}
class StationInformation {
  public corporations: Corporation[];
  public exits: Exit[];
  public lines: Line[];
  public type: Types.StationInfoType;
  public welfareFacilities: WelfareFacility[];

  constructor(input: IStationInformationInput) {
    this.corporations = input.corporations.map((corporation) => Corporation.fromJS(corporation));
    this.exits = input.exits.map((exit) => Exit.fromJS(exit));
    this.lines = input.lines.map((line) => Line.fromJS(line));;
    this.type = input.type;
    this.welfareFacilities = input.welfareFacilities.map((welfareFacility) => WelfareFacility.fromJS(welfareFacility));
  }

  public static fromJS = (json: Types.StationInformation) => {
    return new StationInformation({
      corporations: json['Corporation'] || [],
      exits: json['Exit'] || [],
      lines: json['Line'] || [],
      type: json['Type'],
      welfareFacilities: json['WelfareFacilities'] || []
    });
  }

  public get localExpressLines() {
    return this.lines.filter((line) => !line.isLimitedExpress);
  }
}

interface ICorporationInput {
  name: string;
}
class Corporation {
  public name: string;

  constructor(input: ICorporationInput) {
    this.name = input.name;
  }
  public static fromJS = (json: Types.Corporation) => {
    return new Corporation({
      name: json['Name'],
    });
  }
}

interface IExitInput {
  name: string;
  comment: string;
}
class Exit {
  public name: string;
  public comment: string;

  constructor(input: IExitInput) {
    this.name = input.name;
    this.comment = input.comment;
  }
  public static fromJS = (json: Types.Exit) => {
    return new Exit({
      name: json['Name'],
      comment: json['Comment'],
    });
  }
}

interface ILineInput {
  name: string;
  color: string;
  typeText: string;
  typeDetail: string;
  corporationIndex: string;
}
class Line {
  public name: string;
  public color: string;
  public typeText: string;
  public typeDetail: string;
  public corporationIndex: number;

  constructor(input: ILineInput) {
    this.name = input.name;
    this.color = input.color;
    this.typeDetail = input.typeDetail;
    this.typeText = input.typeText;
    this.corporationIndex = Number(input.corporationIndex);
  }

  public static fromJS = (json: Types.Line) => {
    return new Line({
      color: json['Color'],
      name: json['Name'],
      typeText: typeof json['Type'] === 'string' ? json['Type'] : json['Type']['text'],
      typeDetail: typeof json['Type'] === 'string' ? '' : json['Type']['detail'],
      corporationIndex: json['corporationIndex'],
    });
  }

  public isLimitedExpress(): boolean {
    return this.typeDetail === 'limitedExpress';
  }
}

interface IWelfareFacilityInput {
  name: string;
  comment: string;
}
class WelfareFacility {
  public name: string;
  public comment: string;

  constructor(input: IWelfareFacilityInput) {
    this.name = input.name;
    this.comment = input.comment;
  }
  public static fromJS = (json: Types.WelfareFacility) => {
    return new WelfareFacility({
      name: json['Name'],
      comment: json['Comment'],
    });
  }
}
