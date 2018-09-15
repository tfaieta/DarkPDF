import React, { Component } from 'react'
import { Icon } from 'antd';

export default class SideMenu extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="Example__container__load">
          <Icon type="upload" theme="outlined" />
            <input
              type="file"
              onChange={this.onFileChange}
            />
          </div>
        </header>
      </div>
    )
  }
}
