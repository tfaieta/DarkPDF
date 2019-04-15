import React, { Component } from 'react'
import logo from '../../logo.svg';

export default class Default extends Component {
  render() {
    return (
      <div className="Default">
        <span className="logo"><img src={logo} alt=""/></span>
        <h1 className="Default__Title">DarkPDF</h1>
        <p className="Default__subTitle">An open-source, dark mode PDF viewer for MacOS and the Web.</p>
      </div>
    )
  }
}
