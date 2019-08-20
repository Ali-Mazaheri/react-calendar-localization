import React, { Fragment, Component, lazy, Suspense } from 'react'
import { addjustDate, localizeDateTime } from '../Services/Utils'
import { AppService, IStoreDayModel } from '../Services/AppService'
import { TimeSlot } from './TimeSlot'

export class Day extends Component<any, any> {

  private appServ = new AppService();
  private slotHeight = 10;
  private offset = 6;

  private inProgress = null;

  constructor(prop) {
    super(prop);

    let today: Date = this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();
    today.setHours(0, 0, 0, 0);

    let current = new Date(today.valueOf());

    let dayData: IStoreDayModel[] = this.appServ.getDayData(today) || [];

    this.state = { dayData, today, current };
  }

  mouseMove(e: MouseEvent) {
    let position = this.getCurrentPosition(e);
    let minute = this.getMinute(position);

    let current = addjustDate(this.state.today, minute, 'min');

    if (this.inProgress) {
      let height = position - this.inProgress.top;
      this.inProgress.height = height + this.offset;
    }
    this.setState({ current });
  }

  mouseDown(e: MouseEvent) {
    let position = this.getCurrentPosition(e);
    let minute = this.getMinute(position);
    let current = addjustDate(this.state.today, minute, 'min');

    this.inProgress = { top: position + this.offset, height: 6, color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)` }

    this.state.dayData.push(this.inProgress);
    this.setState({ dayData: this.state.dayData });
  }

  mouseUp(e: MouseEvent) {
    let position = this.getCurrentPosition(e);
    let minute = this.getMinute(position);
    let current = addjustDate(this.state.today, minute, 'min');

    if (this.inProgress) {
      let height = position - this.inProgress.top;
      this.inProgress.height = height + this.offset;
      this.setState({ dayData: this.state.dayData });
      this.inProgress = null;
    }
  }

  private getMinute(position: number) {
    let minute = (15 * position / this.slotHeight);
    let adjusted = Math.max(0, minute);
    adjusted = Math.min(24 * 60, adjusted);
    return adjusted;
  }

  private getCurrentPosition(e: MouseEvent) {
    let top = (e.currentTarget as HTMLElement).getBoundingClientRect().top;
    let sTop = (e.currentTarget as HTMLElement).scrollTop;
    let position = Math.trunc(e.pageY + sTop - top - this.offset);
    return position;
  }

  render() {
    return (
      <div className="day">
        <div>{localizeDateTime('local', this.state.current)}</div>
        <hr />
        <div className="dayBackground"
          onMouseDown={this.mouseDown.bind(this)}
          onMouseUp={this.mouseUp.bind(this)}
          onMouseMove={this.mouseMove.bind(this)}>
          {new Array(96 + 1).fill(0).map((_, i) => {
            let extendedClass = 'dayPattern ' + (((i % 4) == 0) ? 'hour' : ((i % 2) == 0) ? 'halfHour' : 'quarter')
            return <div key={"D" + i} style={{ fontSize: 8 }}>
              <span style={{ position: "absolute", top: this.slotHeight * i }}>
                {i * 0.25}
              </span>
              <hr style={{ top: this.slotHeight * i }} className={extendedClass} />
            </div>
          })}
          {
            this.state.dayData.map((item,ii) => {
              return <TimeSlot key={"T" + ii} {...item} />
            })
          }
        </div>
      </div>
    );
  }

}