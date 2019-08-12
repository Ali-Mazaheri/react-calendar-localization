import React, { Fragment, Component, lazy, Suspense } from 'react'
import { getFirstDateOfWeek, addjustDate, localizeDateTime } from '../Services/Utils'
import { DayCell } from './DayCell'

export class Week extends Component<any, any> {
  render() {
    let culture: string = this.props.culture || 'en';
    let start: Date = this.props.date || new Date();
    let today = this.props.today || new Date();
    let sdow: number = this.props.sdow || 0;
    if (sdow > 6) return null;

    start = getFirstDateOfWeek(start, sdow);

    let dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addjustDate(start, i, 'd'));
    }

    var sow = localizeDateTime("weekLabel", start);
    return (
      <div className="flexRow">
        <div className="weekLabel">{sow}</div>
        {dates.map((date, index) => <DayCell key={'d' + index} culture={culture} today={today} day={date} />)}
      </div>
    );
  }
}