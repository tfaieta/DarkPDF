import React, { Component } from 'react';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import FileViewer from './components/FileViewer/FileViewer';

class App extends Component {
  render() {
    return (
      <div className="Example">
        <SideMenu/>
        <FileViewer/>
      </div>
    );
  }
}

export default App;
