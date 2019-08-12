import React, { Fragment, Component, lazy, Suspense } from 'react'
import { getFirstDateOfWeek, addjustDate } from '../Services/Utils'
import { Week } from './Week'
import { Header } from './Header'
import { CalendarNav } from './CalendarNav'

export class Month extends Component<any, any> {
  render() {
    let sdow: number = this.props.sdow || 0;
    let initialDate: Date = !!this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();

    let today = new Date();
    
    let start = new Date(initialDate.valueOf());
    start.setDate(1)
    start.setHours(0, 0, 0, 0);

    let end = addjustDate(start, 1, 'm');

    let firstDayOfWeek = getFirstDateOfWeek(start, sdow);

    let weeks = [];

    while (firstDayOfWeek.valueOf() < end.valueOf()) {
      weeks.push(firstDayOfWeek);
      firstDayOfWeek = addjustDate(firstDayOfWeek, 7, 'd');
    }

    return (
      <div className="month">
        <Header date={getFirstDateOfWeek(start, sdow)} sdow={sdow} />
        {weeks.map((date, index) => <Week today={today} key={'w'+index} date={date} sdow={sdow} />)}
        <CalendarNav initialDate={initialDate} />
      </div>
    );
  }

}