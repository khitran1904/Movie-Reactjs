import React, { Component } from 'react'
import Header from "../../Components/Header";

export default class MainLayout extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.children}
            </React.Fragment>
        )
    }
}
