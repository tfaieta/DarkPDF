import React, { Component } from 'react'
import Button from '../Button/Button';

export default class SideMenu extends Component {

    render() {
        return (
        <div>
            <header>
            <Button type="zoom-in"/>
            <Button type="zoom-out"/>
            <Button type="book"/>
            <Button type="github"/>
            </header>
        </div>
        )
    }
}
