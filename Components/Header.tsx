import React, { Fragment, Component, lazy, Suspense } from 'react'
import { localizeDateTime, addjustDate, } from '../Services/Utils'
export class Header extends Component<any, any> {

  render() {
    let date: Date = this.props.date || new Date();

    return (
      <div className="flexRow header">
        <div className="weekLabel">&nbsp;</div>
        {new Array(7).fill(0).map((_, ind) => <div key={'h' + ind} className="headerCell">{localizeDateTime('weekDay', addjustDate(date, ind, 'd') )}</div>)}
      </div>
    );
  }
}