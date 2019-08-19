import { TranslationService } from './TranslationService'

let culture = 'en-CA';
export function setCulture(cul: string) {
  culture = cul;
}

export function getCulture() {
  return culture;
}

export type timeUnit = 'y' | 'm' | 'd' | 'h' | 's' | 'ms' | 'min';

export const daysNameFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const daysNameAbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const isoDateReg = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

export const msAjaxReg = /^\/Date\((d|-|.*)\)[\/|\\]$/;

export const enum TimeConstantMs {
  milliSecond = 1,
  second = 1000,
  minute = 60000,
  houre = 3600000,
  day = 24 * 3600000,
  week = 7 * 24 * 3600000
}


export function addjustDate(baseDate: Date, value: number, unit: timeUnit): Date {
  let date = new Date(+baseDate);
  switch (unit) {
    case 'y':
      date.setFullYear(date.getFullYear() + value);
      break;
    case 'm':
      date.setMonth(date.getMonth() + value);
      break;
    case 'd':
      date.setDate(date.getDate() + value);
      break;
    case 'h':
      date.setHours(date.getHours() + value);
      break;
    case 'min':
      date.setMinutes(date.getMinutes() + value);
      break;
    case 's':
      date.setSeconds(date.getSeconds() + value);
      break;
    case 'ms':
      date.setMilliseconds(date.getMilliseconds() + value);
      break;

  }
  return date;
}

export function getFirstDateOfWeek(date: Date, startDayOfWeek: number): Date {
  let d = new Date(+date);
  while (d.getDay() != startDayOfWeek) {
    d = addjustDate(d, -1, 'd');
  }
  return d;
}


export function localize(key: string): string {
  return TranslationService.getLocalizedString(culture, key);
}

export function localizeDateTime(format: string, date: Date, date2?: Date) {
  return TranslationService.getLocalizedDate(culture, format, date, date2)
}