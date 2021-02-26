import React from "react";

export default function index(props) {
  const { bookMovie } = props.location.state;
  return <div>{console.log(bookMovie)}</div>;
}
