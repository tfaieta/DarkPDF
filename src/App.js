import React, { Component } from 'react';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import FileViewer from './components/FileViewer/FileViewer';
import Default from './components/Default/Default';

class App extends Component {
  render() {
    return (
      <div className="Example">
        <SideMenu/>
        <Default/>
      </div>
    );
  }
}

export default App;
