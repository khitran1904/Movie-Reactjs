import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
export default function MainLayout(props) {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
}
