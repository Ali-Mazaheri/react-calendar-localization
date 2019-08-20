import { } from "./Utils"


export interface IStoreDayModel {
  id: number,
  start: Date,
  end: Date,
  content: string
}

interface IStoreMonthModel {
  [day: string]: IStoreDayModel[]
}

interface IStoreModel {
  [month: string]: IStoreMonthModel
}

export class AppService {

  public static startDayOfWeek = 0;
  public static dbVersion = '1.0.0';
  //----------------------------

  constructor() {
    if (!window.localStorage.getItem("dataVersion") || window.localStorage.getItem("dataVersion") != AppService.dbVersion) {
      window.localStorage.clear();
      window.localStorage.setItem("dataVersion", AppService.dbVersion);
    }
  }

  public saveData(date: Date, data: IStoreDayModel[]): void {
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();

    var storage = window.localStorage;

    if (!this.getYearData(year)) {
      let d: IStoreModel = { [month]: { [day]: null } };
      storage.setItem(year, JSON.stringify(d));
    }

    let yearStore: IStoreModel = this.getYearData(year);

    let monthCollection = yearStore[month];
    if (!monthCollection) {
      yearStore[month] = { [day]: [] };
    }

    yearStore[month][day] = data;

    window.localStorage.setItem(year, JSON.stringify(yearStore));
  }

  public getYearData(year: string): IStoreModel {
    var storage = window.localStorage;
    return JSON.parse(storage.getItem(year) || null);
  }

  public getDayData(date: Date): IStoreDayModel[] {
    var storage = window.localStorage;
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();

    let yearData: IStoreModel = this.getYearData(year);

    if (yearData) {
      if (yearData[month]) {
        if (yearData[month][day] instanceof Array && yearData[month][day].length > 0) {
          return yearData[month][day];
        }
      }
    }
    return null;
  }
}