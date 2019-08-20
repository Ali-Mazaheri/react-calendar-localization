import React, { Fragment, Component, lazy, Suspense } from 'react'
import { addjustDate, localizeDateTime } from '../Services/Utils'

export class TimeSlot extends Component<any, any> {

  render() {
    console.log('ss');
    let { top, height, color } = this.props;
    return (
      
      <div className="timeSlot" style={{ height, top, backgroundColor: color }}>
        Test
      </div>
    );
  }

}