import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetailAction,
  getMovieDetailScheduleAction,
} from "../../Action/Movie";
import {
  getTheaterBrand,
  resetTheaterBrand,
  getBrandAddresses,
} from "../../Action/Theater";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import LoadingPage from "../../Components/Loading";
import "react-circular-progressbar/dist/styles.css";
import "./style.css";

export default function MovieDetail(props) {
  const dispatch = useDispatch();
  const [movieTime, setMovieTime] = useState("");
  const [pickCinemaBrand, setPickCinemaBrand] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { movieDetail, loading, movieSchedule } = useSelector((state) => {
    return state.movieReducer;
  });

  const { listBrand, listAddresses } = useSelector((state) => {
    return state.theaterReducer;
  });

  useEffect(() => {
    dispatch(getMovieDetailAction(props.match.params.movieId));
    dispatch(getMovieDetailScheduleAction(props.match.params.movieId));
    dispatch(getTheaterBrand("BHDStar"));
    dispatch(getTheaterBrand("CineStar"));
    dispatch(getTheaterBrand("MegaGS"));
    dispatch(getTheaterBrand("CGV"));
    dispatch(getTheaterBrand("LotteCinima"));
    dispatch(getTheaterBrand("Galaxy"));
    return () => {
      dispatch(resetTheaterBrand());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getBrandAddresses(pickCinemaBrand));
  }, [pickCinemaBrand]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (movieSchedule.heThongRapChieu) {
      setPickCinemaBrand(movieSchedule.heThongRapChieu[0].maHeThongRap);
    }
  }, [movieSchedule.maPhim]);

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
      if (1 === 2) return "https://www.youtube.com/embed/ZMT5u8Kb7pI";
    }
  };

  if (loading) {
    return <LoadingPage />;
  } else {
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
              <p>Mô tả: {movieDetail.moTa}</p>
              <p className="movie-time">
                {movieDetail.lichChieu && !movieTime
                  ? setMovieTime(movieDetail.lichChieu[0].thoiLuong)
                  : ""}
                Thời lượng: {movieTime} phút
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
                  <div
                    style={{ padding: "56.25% 0 0 0", position: "relative" }}
                  >
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
        <div className="movie-schedule row">
          <div className="col-4 brand-container">
            {listBrand.map((brand, index) => (
              <div
                className={
                  "d-flex align-items-center tab-brand " +
                  (brand[0].maHeThongRap === pickCinemaBrand ? "active" : "")
                }
                key={brand[0].biDanh}
                onClick={() => {
                  setPickCinemaBrand(brand[0].maHeThongRap);
                }}
              >
                <img src={brand[0].logo} className="brand-img" alt="" />
                <div>{brand[0].tenHeThongRap}</div>
              </div>
            ))}
          </div>

          <div className="col-8 brand-content">
            {movieSchedule.heThongRapChieu?.map((rapChieu, index) => {
              if (rapChieu.maHeThongRap === pickCinemaBrand) {
                return rapChieu.cumRapChieu.map((rap) => (
                  <div
                    className=""
                    key={rap.maCumRap}
                    style={{ padding: "20px 20px 10px 20px" }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ paddingBottom: "20px" }}
                    >
                      <img
                        src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-vincom-3-2-16105957596860.png"
                        alt=""
                        style={{ width: "70px", marginRight: "10px" }}
                      />
                      <div>
                        <span style={{ fontSize: "16px", display: "block" }}>
                          {rap.tenCumRap}
                        </span>
                        {listAddresses.map((address) => {
                          if (address.maCumRap === rap.maCumRap) {
                            return (
                              <span
                                key={address.diaChi}
                                style={{ fontSize: "16px", display: "block" }}
                              >
                                {address.diaChi}
                              </span>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <div className="d-flex flex-wrap cinema-time ">
                      {rap.lichChieuPhim.map((lichChieu) => {
                        return (
                          <div
                            key={lichChieu.maLichChieu}
                            className="pill-time"
                          >
                            {lichChieu.ngayChieuGioChieu.split("T")[1]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
