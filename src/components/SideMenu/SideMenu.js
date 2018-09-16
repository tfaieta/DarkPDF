import React, { Component } from 'react'
import { Icon } from 'antd';

export default class SideMenu extends Component {

    render() {
        return (
        <div>
            <header>
            {/* <div className="Example__container__load">
                <Icon type="upload" style={{ fontSize: '25px', margin: 10, marginTop: 15, color: '#08c'}}>
                    <input
                    type="file"
                    onChange={this.props.onFileUpload}/>
                </Icon>
            </div> */}
            <div className="Example__container__load">
                <Icon type="zoom-in" style={{ fontSize: '25px', margin: 10, marginTop: 15, color: '#08c'}}>
                </Icon>
            </div>
            <div className="Example__container__load">
                <Icon type="zoom-out" style={{ fontSize: '25px', margin: 10, marginTop: 15, color: '#08c'}}>
                </Icon>
            </div>
            </header>
        </div>
        )
    }
}
