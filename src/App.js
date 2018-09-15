import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { Icon } from 'antd';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './App.css';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

class App extends Component {
  state = {
    file: './sample.pdf',
    numPages: null,
    svg: "svg",
    loaded: false
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, loaded: true });
  }

  render() {
    const { file, numPages, svg } = this.state;

    return (
      <div className="Example">
        <header>
          <div className="Example__container__load">
          <Icon type="upload" theme="outlined" />
            <input
              type="file"
              onChange={this.onFileChange}
            />
          </div>
        </header>
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess}
              options={options}
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      renderMode={svg}
                      className={this.state.loaded ? "darkify" : null}
                    />
                  ),
                )
              }
            </Document>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
