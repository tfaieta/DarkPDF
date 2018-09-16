import React, { Component } from 'react'
import { Icon } from 'antd';

export default class SideMenu extends Component {

    render() {
        return (
        <div>
            <header>
            <div className="Example__container__load">
                    <input
                    type="file"
                    style={{display: "block"}}
                    onChange={this.props.onFileUpload}/>
            </div>
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
