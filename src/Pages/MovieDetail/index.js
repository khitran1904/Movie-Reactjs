import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
import Footer from "../../Components/Footer";
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
      <Footer />
    </div>
  );
}
