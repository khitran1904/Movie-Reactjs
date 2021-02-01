import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
export default function MovieDetail(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { movieDetail } = useSelector((state) => {
    return state.movieReducer;
  });
  return (
    <div>
      Movie Detail Movie Detail
      <img
        src={movieDetail.hinhAnh}
        style={{ width: "200px", height: "200px" }}
        alt=""
      />
    </div>
  );
}
