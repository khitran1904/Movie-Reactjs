import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction } from "../../Action/Movie";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import LoadingPage from "../../Components/Loading";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";

export default function MovieDetail(props) {
  const dispatch = useDispatch();
  var movieTime = {};
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { movieDetail, loading } = useSelector((state) => {
    return state.movieReducer;
  });

  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleUrlTrailer = (urlTrailer) => {
    if (urlTrailer) {
      if (urlTrailer.includes("https://www.youtube.com/embed/")) {
        return urlTrailer;
      } else if (urlTrailer.includes("https://www.youtube.com/watch")) {
        return urlTrailer.replace("/watch?v=", "/embed/");
      } else {
        return "https://www.youtube.com/embed/ZMT5u8Kb7pI";
      }
    } else {
      return "https://www.youtube.com/embed/ZMT5u8Kb7pI";
    }
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
        <div className="movie-info row">
          <div className="movie-poster col-5">
            <div className="movie-poster-main">
              <img src={movieDetail.hinhAnh} className="" alt="" />
            </div>
          </div>
          <div className="movie-main-info col-5">
            <p className="movie-date">
              Ngày chiếu: {movieDetail.ngayKhoiChieu?.split("T")[0]}
            </p>
            <p className="movie-name">
              Tên phim: {movieDetail.tenPhim?.toUpperCase()}
            </p>

            <p className="movie-time">
              {movieDetail.lichChieu?.forEach((time, index) => {
                if (index === 0) {
                  return (movieTime = time);
                }
              })}
              Thời lượng: {movieTime.thoiLuong} phút
            </p>

            <Button
              variant="danger"
              className="btn-trailer"
              onClick={handleShow}
            >
              Xem Trailer
            </Button>

            <Modal
              className="modal"
              show={show}
              onHide={handleClose}
              animation={true}
            >
              <Modal.Body>
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    id="ytplayer"
                    src={handleUrlTrailer(movieDetail.trailer)}
                    title={movieDetail.tenPhim}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    frameBorder={0}
                    allow="autoplay; fullscreen"
                    // allowFullScreen
                  />
                </div>
              </Modal.Body>
            </Modal>

            <Button variant="success" className="btn-bookMovie ">
              Đặt vé
            </Button>
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
      </div>
      <div className="movie-schdule"></div>
    </div>
  );
}
