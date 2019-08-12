import React, { Fragment, Component, lazy, Suspense } from 'react'

export class Day extends Component<any, any> {
  render() {
    let date = this.props.match.params.date || new Date().toDateString();
    return (
      <div className="day">
          <span>{ date.toString()}</span>
      </div>
    );
  }

}