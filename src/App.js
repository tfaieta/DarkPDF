import React, { Component } from 'react';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';
import FileViewer from './components/FileViewer/FileViewer';
import Default from './components/Default/Default';

class App extends Component {
  state = {
    activity: false,
  }

  render() {
    return (
      <div className="Example">
        <SideMenu/>
        {this.state.activity ? <FileViewer/> : <Default/>}
      </div>
    );
  }
}

export default App;
