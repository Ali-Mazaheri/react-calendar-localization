// enums
export const enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}



// intefaces ========================================================

export interface ICellData {
    date: Date;
}

export interface IConfigurations {
    dbVersion: string;
    startTime: number;
    endTime: number;
    //minutes
    durationInMinute: number;
    repeatEveryMinute: number;
    culture: string;
    startOfWeek: DayOfWeek;
}

export interface IDayCellData {
    startTime: Date;
    endTime: Date;
    isNotAvailable: boolean;
    comment: string;
}

export interface IDayCellStore {
    [dayIndex: number]: IDayCellData[];
}