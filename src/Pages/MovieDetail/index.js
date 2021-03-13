import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
import LoadingPage from "../../Components/Loading";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactStars from "react-rating-stars-component";
import YoutubePopup from "../../Components/YtbPopup";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";
export default function MovieDetail(props) {
  const dispatch = useDispatch();
  const percentage = 66;
  const { movieDetail, loading } = useSelector((state) => {
    return state.movieReducer;
  });

  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleRenderStarRating = (rates) => {
    for (let i = 0; i < rates / 2; i++) {}
  };

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
          backgroundImage: `url(${movieDetail.hinhAnh})`,
        }}
      >
        <div className="bg-overlay"></div>
        <div className="movie-img"></div>
        <div className="movie-info row">
          <div className="movie-poster col-3">
            <div className="movie-poster-main">
              <img src={movieDetail.hinhAnh} className="" alt="" />
            </div>
          </div>
          <div className="movie-main-info col-5">
            <p className="movie-date">
              {movieDetail.ngayKhoiChieu?.split("T")[0]}
            </p>
            <p className="movie-name">{movieDetail.tenPhim?.toUpperCase()}</p>

            <p className="movie-time"></p>
          </div>
          <div className="movie-rating col-2">
            <CircularProgressbar
              strokeWidth={4}
              value={movieDetail.danhGia}
              maxValue={10}
              text={`${movieDetail.danhGia}`}
              styles={buildStyles({
                textSize: "40px",
                textColor: "white",
                pathColor: "#7ed321",
                trailColor: "#3a3a3a",
              })}
            />

            <ReactStars
              classNames="star-ratings"
              size={22}
              count={5}
              color={"white"}
              activeColor={"red"}
              value={movieDetail.danhGia / 2}
              isHalf={true}
              emptyIcon={<i className="far fa-star" />}
              halfIcon={<i className="fa fa-star-half-alt" />}
              filledIcon={<i className="fa fa-star" />}
              edit={false}
            />
          </div>
        </div>
        <div className="movie-rating col-5"></div>
      </div>
      <YoutubePopup trailer={movieDetail.trailer} />
    </div>
  );
}
