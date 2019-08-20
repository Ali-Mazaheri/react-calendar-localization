import React, { Fragment, Component, lazy, Suspense } from 'react'
import { addjustDate, localizeDateTime } from '../Services/Utils'
import { AppService, IStoreDayModel } from '../Services/AppService'

export class Day extends Component<any, any> {
  private appServ = new AppService();

  count = 10;
  constructor(prop) {
    super(prop);

    let date: Date = this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();
    let data = this.appServ.getDayData(date) || [];

    let start = localizeDateTime('time24', date);
    let end = localizeDateTime('time24', date);

    this.state = { data, start, end };

    this.startRef = React.createRef();
    this.endRef = React.createRef();
    this.contentRef = React.createRef();
  }
  startRef;
  endRef;
  contentRef;


  render() {
    let data = this.state.data;
    let date: Date = this.props.match.params.date ? new Date(this.props.match.params.date) : new Date();

    return (
      <div className="day">
        <div>{localizeDateTime('date', date)}</div>
        <hr />
        <div>
          <label>Between </label>
          <input type="time" ref={this.startRef} required value={this.state.start} onChange={(e) => { this.setState({ start: e.target.value }) }} />
          <label> And </label>
          <input type="time" ref={this.endRef} required value={this.state.end} onChange={(e) => { this.setState({ end: e.target.value }) }} />
          <span> => </span>
          <input ref={this.contentRef} required placeholder="Waht is our plan" />

          <span onClick={() => {
            let startTime: number[] = this.startRef.current.value.split(':');
            let endTime: number[] = this.endRef.current.value.split(':');
            
            
            let selectedStart = new Date(date.valueOf());
            selectedStart.setHours(startTime[0], startTime[1], 0, 0);
            let selectedEnd = new Date(date.valueOf());
            selectedEnd.setHours(endTime[0], endTime[1], 0, 0);

            let schedule: IStoreDayModel = {
              id: Math.random(),
              end: selectedEnd,
              start: selectedStart,
              content: this.contentRef.current.value
            };

            data.push(schedule);
            data.sort((b, a) => {
              return (new Date(b.start).valueOf()) - (new Date(a.start).valueOf())
            });

            this.setState({ data: this.state.data });
            this.appServ.saveData(date, this.state.data);
          }}> Add </span>
        </div>

        <hr />

        {data.map((a, i) => {
          let dateStart = new Date(a.start.valueOf());
          let dateEnd = new Date(a.end.valueOf());
          let time = localizeDateTime("timeHint", dateStart, dateEnd);
          
          return <div>
            <br />
            <div>
              <span>{time}</span>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input value={this.state.data[i].content} onInput={(e) => {
                data[i].content = e.target.value;
                this.setState({ data });
                this.appServ.saveData(date, this.state.data);
              }} />
              <span onClick={()=>{
                this.state.data.splice(i,1);
                this.setState({ data: this.state.data });
                this.appServ.saveData(date, this.state.data);
              }}>X</span>
            </div>

          </div>
        })}
      </div>
    );
  }

}