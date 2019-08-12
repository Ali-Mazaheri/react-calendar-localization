import React, { Fragment, Component, lazy, Suspense } from 'react'
import { Link } from "react-router-dom"
import {  localizeDateTime } from '../Services/Utils'

export class DayCell extends Component<any, any> {

  render() {
    let today: Date = this.props.today || new Date();
    today.setHours(0, 0, 0, 0);
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();

    let day: Date = this.props.day;
    day.setHours(0, 0, 0, 0);
    let month = day.getMonth();
    let year = day.getFullYear();

    let className =
      ((thisYear * 12 + thisMonth) > (year * 12 + month)) ? "past" :
        ((thisYear * 12 + thisMonth) < (year * 12 + month)) ? "future" :
          "current";

    return (
      <div className={`dayCell ${className}`}>
        <div className="header">
          <Link to={"/day/" + day.toUTCString()}>
            <span>{localizeDateTime("day", day)}</span>
          </Link>
        </div>
      </div>
    );
  }

}