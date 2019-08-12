import React, { Fragment, Component, lazy, Suspense } from 'react'
import { Link, NavLink } from "react-router-dom"
import { addjustDate, localizeDateTime } from '../Services/Utils'

export class CalendarNav extends Component<any, any> {

  render() {
    let initialDate: Date = new Date(+this.props.initialDate);
    initialDate.setDate(1);

    let nextYear = addjustDate(initialDate, 1, 'y').toUTCString();
    let prevYear = addjustDate(initialDate, -1, 'y').toUTCString();
    let nextMonth = addjustDate(initialDate, 1, 'm').toUTCString();
    let prevMonth = addjustDate(initialDate, -1, 'm').toUTCString();

    return (
      <div className="calendarNav">
        <NavLink exact to={"/month/" + prevYear} className="prev">
          &#171;
        </NavLink>

        <NavLink exact to={"/month/" + prevMonth} className="prev">
          &#8249;
        </NavLink>

        <span className="title"> {localizeDateTime("monthYear", initialDate)}</span>

        <NavLink exact to={"/month/" + nextMonth} className="next">
          &#8250;
        </NavLink>

        <NavLink exact to={"/month/" + nextYear} className="next">
          &#187;
        </NavLink>
      </div>
    );
  }

}