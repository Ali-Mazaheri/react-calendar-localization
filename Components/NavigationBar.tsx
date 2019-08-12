import React, { Fragment, Component, lazy, Suspense } from 'react'
import { Link, NavLink } from "react-router-dom"
import { addjustDate, localize } from '../Services/Utils'

export class NavigationBar extends Component<any, any> {
  render() {
    return (
      <div className="navBar flexRow">
        <NavLink exact to={"/month"} activeClassName="selectedLink">
          {localize('Month')}
        </NavLink>
        <NavLink exact to={"/week/"} activeClassName="selectedLink">
          {localize('Week')}
        </NavLink>
        <NavLink exact to={"/day/"} activeClassName="selectedLink">
          {localize('Day')}
        </NavLink>
        {this.props.children}
      </div>
    );
  }

}