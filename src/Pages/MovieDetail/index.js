import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
export default function MovieDetail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
  }, []);

  const { movieDetail } = useSelector((state) => {
    return state.movieReducer;
  });
  return (
    <div>
      {console.log(movieDetail)}
      <img
        src={movieDetail.hinhAnh}
        style={{ width: "100px", height: "100px" }}
        alt=""
      />
    </div>
  );
}
