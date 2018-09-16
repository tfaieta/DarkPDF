import React, { Component } from 'react'
import { Icon } from 'antd';

export default class SideMenu extends Component {

    onFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
        });
    }

    // TODO: ADD FILEVIEWER REDO LOGIC!!!!
    render() {
        return (
        <div>
            <header>
            <div className="Example__container__load">
                <Icon type="upload" style={{ fontSize: '25px', margin: 10, marginTop: 30, color: '#08c'}}>
                    <input
                    type="file"
                    style={{display: "none"}}
                    onChange={this.onFileChange}/>
                </Icon>
            </div>
            <div className="Example__container__load">
                <Icon type="zoom-in" style={{ fontSize: '25px', margin: 10, marginTop: 15, color: '#08c'}}>
                    <input
                    type="file"
                    style={{display: "none"}}
                    onChange={this.onFileChange}/>
                </Icon>
            </div>
            <div className="Example__container__load">
                <Icon type="zoom-out" style={{ fontSize: '25px', margin: 10, marginTop: 15, color: '#08c'}}>
                    <input
                    type="file"
                    style={{display: "none"}}
                    onChange={this.onFileChange}/>
                </Icon>
            </div>
            </header>
        </div>
        )
    }
}
