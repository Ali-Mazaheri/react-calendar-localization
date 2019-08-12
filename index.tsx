import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { cultures } from "./Services/Data"
import { setCulture, getCulture } from "./Services/Utils"

import './style.css';

import { NavigationBar } from './Components/NavigationBar'
import { Month } from './Components/Month'
import { Week } from './Components/Week'
import { Day } from './Components/Day'
class App extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>

        <NavigationBar >
          <select value={getCulture()} onChange={(e) => {
            setCulture(e.target.value);
            this.forceUpdate()
          }}>
            {cultures.map((cult, index) => (<option key={'cu' + index} value={cult.cultureInfoCode}>{cult.country + ' - ' + cult.language} </option>))}
          </select>
        </NavigationBar>

        <hr />
        <Switch>
          <Route exact path="/" component={Month} />
          <Route exact path="/month/:date?" component={Month} />
          <Route exact path="/week/:date?" component={Week} />
          <Route exact path="/day/:date?" component={Day} />
          <Route component={NotFoundPage} />
        </Switch>

      </Router>
    );
  }
}

function NotFoundPage() {
  return <div>Not Found</div>;
}

render(<App />, document.getElementById('root'));
