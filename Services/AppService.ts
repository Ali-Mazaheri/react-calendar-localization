import { } from "./Utils"
import { IDayCellStore, IDayCellData, IConfigurations } from "./CommonInterfacesAndEnum";



export class AppService {

  public startDayOfWeek = 0;

  //----------------------------
  private store: IDayCellStore = {};

  constructor() {
    // if (!window.localStorage.getItem("dataVersion") || window.localStorage.getItem("dataVersion") != this.configuration.dbVersion) {
    //   window.localStorage.clear();
    //   window.localStorage.setItem("dataVersion", this.configuration.dbVersion);
    // }
  }

  saveData(date: Date, availability: IDayCellData[]): void {
    window.localStorage.setItem(date.setHours(0, 0, 0, 0).toString(), JSON.stringify(availability));
  }

  getDayData(date: Date): IDayCellData[] {
    var store = window.localStorage;
    var dayIndex: string = date.setHours(0, 0, 0, 0).toString();
    var dayOfWeek = date.getDay();
    var rawData = store.getItem(dayIndex);
    var res: IDayCellData[] = [];
    if (!rawData) {
      res = [];
      // var startHour = this.configuration.startTime * 60;
      // var entHour = this.configuration.endTime * 60;
      // var timeStep = this.configuration.repeatEveryMinute;
      // var duration = this.configuration.durationInMinute;
      // for (let i = startHour; i <= entHour; i = i + timeStep) {
      //   var DCD: IDayCellData = {
      //     startTime: new Date(date.setHours(0, i, 0, 0)),
      //     endTime: new Date(date.setHours(0, i + duration, 0, 0)),
      //     isNotAvailable: false,
      //     comment: ""
      //   };
      //   res.push(DCD);
      // }

      store.setItem(dayIndex.toString(), JSON.stringify(res));
      return res;
    }

    res = JSON.parse(rawData, (key, value) => {
      if (typeof (value) == "string") {
        // if (this.isoDateReg.test(value)) {
        //   return new Date(value);
        // } else if (this.msAjaxReg.test(value)) {
        //   var b = this.msAjaxReg.exec(value)[1].split(/[-+,.]/);
        //   return new Date(b[0] ? +b[0] : 0 - +b[1]);
        // }
        return value;
      }
      return value;
    });

    return res;
  }

}