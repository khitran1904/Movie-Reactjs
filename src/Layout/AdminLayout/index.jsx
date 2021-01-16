import React, { Component } from 'react'

export default class AdminLayout extends Component {
    render() {
        return (
            <div>
                <h1>AdminLayout</h1>
                {this.props.children}
            </div>
        )
    }
}
