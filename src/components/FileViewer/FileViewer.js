import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import '../../../node_modules/react-pdf/dist/Page/AnnotationLayer.css'
import SideMenu from '../SideMenu/SideMenu';
import Default from '../Default/Default';

const options = {
    cMapUrl: 'cmaps/SideMenu.js/',
    cMapPacked: true,
  };

export default class FileViewer extends Component {
    state = {
    file: '',
    numPages: null,
    svg: "svg",
    loaded: false,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, loaded: true });
    }

    onFileChange = (event, file) => {
        this.setState({
            file: event.target.files[0],
            activity: true 
        });
    }

    render() {
        const { file, numPages, svg } = this.state;
        return (
        <div>
            <SideMenu
                onFileUpload={this.onFileChange}
            />
            <Default/>
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
        )
    }
}
