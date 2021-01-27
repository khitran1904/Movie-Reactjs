import React from "react";

export default function MovieDetail(props) {
  return (
    <div>
      {console.log(props.match.params.movieId)}
      MovieDetail MovieDetail
    </div>
  );
}
