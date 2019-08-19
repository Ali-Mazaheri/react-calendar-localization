import React, { Fragment, Component, lazy, Suspense } from 'react'
import { addjustDate, localizeDateTime } from '../Services/Utils'
import { AppService } from '../Services/AppService'

export class Day extends Component<any, any> {
  private appServ = new AppService();

  count = 10;
  constructor(prop) {
    super(prop);

    let date: Date = this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();
    let data = this.appServ.getDayData(date) || new Array(10).fill('');
    this.state = { data };
  }

  render() {
    let data = this.state.data;
    let date: Date = this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();
    return (
      <div className="day">
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{localizeDateTime('date', date)}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={() => {
          this.appServ.saveData(date, this.state.data);
          alert('Saved');
        }}>Save</span>
        {new Array(this.count).fill(1).map((a, i) => {
          let time = localizeDateTime("time", addjustDate(date, 480 + 60 * i, 'min'))
            .substr(12, 500);
          return <div>
            <br />
            <div>
              <span>{time}</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input value={this.state.data[i]} onInput={(e) => {
                data[i] = e.target.value;
                this.setState({ data });
              }} />
            </div>

          </div>
        })}
      </div>
    );
  }

}