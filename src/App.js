import React, { Component } from 'react';
import './App.css';
import FileViewer from './components/FileViewer/FileViewer';

class App extends Component {

  render() {
    return (
      <div className="Example">
        <FileViewer/>
      </div>
    );
  }
}

export default App;
