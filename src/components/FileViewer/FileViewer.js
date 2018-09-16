import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import '../../../node_modules/react-pdf/dist/Page/AnnotationLayer.css'
import Dropzone from 'react-dropzone'
import SideMenu from '../SideMenu/SideMenu';
import Default from '../Default/Default';

const options = {
    cMapUrl: 'cmaps/SideMenu.js/',
    cMapPacked: true,
  };

export default class FileViewer extends Component {
    constructor() {
        super()
        this.state = {
            numPages: null,
            svg: "svg",
            loaded: false,
            accept: '',
            file: '',
            dropzoneActive: false,
            defaultActive: true,
            fill: '#fff'
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, loaded: true, defaultActive: false });
    }

    onDragEnter() {
        this.setState({
          dropzoneActive: true
        });
    }
    
    onDragLeave() {
    this.setState({
        dropzoneActive: false
    });
    }

    onDrop(file, rejected) {
    this.setState({
        file: file[0],
        dropzoneActive: false
    });
    }

    applyMimeTypes(event) {
    this.setState({
        accept: event.target.value[0]
    });
    }

    render() {
        const {accept, dropzoneActive, file, numPages, svg } = this.state;
        const overlayStyle = {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          padding: '2.5em 0',
          background: 'rgba(0,0,0,0.5)',
          textAlign: 'center',
          color: '#fff'
        };
        return (
        <div>
            <Dropzone
            disableClick
            style={{position: "relative"}}
            accept={accept}
            onDrop={this.onDrop.bind(this)}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            >
            { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
            <SideMenu/>
            {this.state.defaultActive ? <Default/> : null }
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
            </Dropzone> 
        </div>
        )
    }
}
