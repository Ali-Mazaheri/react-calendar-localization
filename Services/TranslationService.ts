export class TranslationService {
  private static dictunary: { [culture: string]: { [key: string]: string } } = 
  {"fa-IR":{"Month":'ماه', "Week":'هفته', "Day":'روز'}};

  public static getLocalizedString(culture: string='en', key: string): string {
    if (culture.indexOf('en') > -1) {
      return key;
    }
    if (!this.dictunary[culture] || !this.dictunary[culture][key]) {
      return key;
      //return "(" + culture + '-' + key + ")";
    }
    return this.dictunary[culture][key];
  }


  public static getLocalizedDate(culture: string, format: string, value: Date, value2?: Date): string {
    var res = "";
    switch (format) {
      case "day":
        res = value.toLocaleDateString(culture, { day: "numeric" })
        break;
      case "date":
        res = value.toLocaleDateString(culture, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        break;
      case "week":
        var startOfWeek = new Date(value.valueOf());
        startOfWeek.setDate(startOfWeek.getDate() - 6);
        res = startOfWeek.toLocaleDateString(culture, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
          " - " +
          value.toLocaleDateString(culture, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        break;
      case "monthYear":
        res = value.toLocaleDateString(culture, { month: "long", year: "numeric" });
        break;
      case "weekLabel":
        res = value.toLocaleDateString(culture, { month: "short", day: "2-digit" });
        break;
      case "weekDay":
        res = value.toLocaleDateString(culture, { weekday: "long" });
        break;
      case "timeHint":
        if (!value2) {
          return 'invalid';
        }
        res = value.toLocaleTimeString(culture, { hour: "2-digit", minute: "2-digit" }) +
          " - " +
          value2.toLocaleTimeString(culture, { hour: "2-digit", minute: "2-digit" });
        break;
    }
    return res;

  }
}