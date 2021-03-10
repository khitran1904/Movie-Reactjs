import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
import LoadingPage from "../../Components/Loading";
import "./style.css";
export default function MovieDetail(props) {
  const dispatch = useDispatch();
  const { movieDetail, loading } = useSelector((state) => {
    return state.movieReducer;
  });
  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="">
      <div
        className="movie-detail "
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div className="movie-img">
          <img src={movieDetail.hinhAnh} className="img-fluid" alt="" />
        </div>
        <div className="movie-info row">
          <div className="movie-poster col-3">
            <img src={movieDetail.hinhAnh} className="img-fluid" alt="" />
          </div>
          <div className="movie-main-info col-5">
            <p className="movie-date">
              {movieDetail.ngayKhoiChieu?.split("T")[0]}
            </p>
            <p className="movie-name">{movieDetail.tenPhim?.toUpperCase()}</p>
            <p className="movie-desc">{movieDetail?.moTa}</p>
          </div>
          <div className="movie-rating col-2">Movie rating</div>
        </div>
        <div className="movie-rating col-5">Movie Rating</div>
      </div>
    </div>
  );
}
