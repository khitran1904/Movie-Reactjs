import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
export default class MainLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}
