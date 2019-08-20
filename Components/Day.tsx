import React, { Fragment, Component, lazy, Suspense } from 'react'
import { addjustDate, localizeDateTime } from '../Services/Utils'
import { AppService, IStoreDayModel } from '../Services/AppService'

export class Day extends Component<any, any> {

  private appServ = new AppService();
  private slotHeight = 10;
  constructor(prop) {
    super(prop);

    let today: Date = this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();
    today.setHours(0, 0, 0, 0);

    let current = new Date(today.valueOf());

    let dayData: IStoreDayModel[] = this.appServ.getDayData(today) || [];

    this.state = { dayData, today, current };
  }

  mouseMove(e: MouseEvent) {
    let top = (e.currentTarget as HTMLElement).getBoundingClientRect().top;
    let sTop = (e.currentTarget as HTMLElement).scrollTop;
    let position = Math.trunc(e.pageY + sTop - top - 6);
    //console.log(Math.floor((e.pageY + sTop- top) / (this.slotHeight)));
    let minute = (15 * position / this.slotHeight);

    let adjusted = Math.max(0, minute);
    adjusted = Math.min(24 * 60, adjusted);

    let current = addjustDate(this.state.today, adjusted, 'min');
    this.setState({ current });
    console.log(current);
  }

  render() {
    return (
      <div className="day">
        <div>{localizeDateTime('local', this.state.current)}</div>
        <hr />
        <div className="dayBackground" onMouseMove={this.mouseMove.bind(this)}>
          {new Array(96 + 1).fill(0).map((_, i) => {
            let extendedClass = 'dayPattern ' + (((i % 4) == 0) ? 'hour' : ((i % 2) == 0) ? 'halfHour' : 'quarter')
            return <div style={{ fontSize: 8 }}>
              <span style={{ position: "absolute", top: this.slotHeight * i }}>
                {i * 0.25}
              </span>
              <hr style={{ top: this.slotHeight * i }} className={extendedClass} />
            </div>
          })}
        </div>
      </div>
    );
  }

}