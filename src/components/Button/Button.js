import React, { Component } from 'react'
import { Icon } from 'antd';


export default class Button extends Component {
  render() {
    return (
      <div style={{justifyContent: "center", alignItems: "center",  marginTop: 35}}>
        <button> 
            <div className="Example__container__load">
                <Icon type={this.props.type} style={{ fontSize: '25px', color: '#08c'}}>
                </Icon>
            </div>
        </button>
      </div>
    )
  }
}
