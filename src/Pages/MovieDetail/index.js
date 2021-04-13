import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactStars from "react-rating-stars-component";
import { Button, Modal } from "react-bootstrap";
import LoadingPage from "../../Components/Loading";
import {
  getMovieDetailAction,
  getMovieDetailScheduleAction,
  resetMovieDetailSchedule,
} from "../../Action/Movie";
import {
  getTheaterBrand,
  resetTheaterBrand,
  getBrandAddresses,
} from "../../Action/Theater";

import "react-circular-progressbar/dist/styles.css";
import "./style.css";

export default function MovieDetail(props) {
  const dispatch = useDispatch();
  const [listTimeAvailable, setListTimeAvailable] = useState([]);
  const [listBrandAvailable, setListBrandAvailable] = useState([]);
  const [listCinemaAvailable, setListCinemaAvailable] = useState([]);
  const [pickCinemaBrand, setPickCinemaBrand] = useState("");
  const [pickDateToBook, setPickDateToBook] = useState("");
  const [dateArr, setDateArr] = useState([]);
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
      dispatch(resetMovieDetailSchedule());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let tempArr = [];
    if (movieSchedule.heThongRapChieu) {
      setPickCinemaBrand(movieSchedule.heThongRapChieu[0].maHeThongRap);
      setPickDateToBook(
        movieSchedule.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu.split(
          "T"
        )[0]
      );
      movieSchedule.heThongRapChieu.forEach((rapChieu) => {
        tempArr.push(rapChieu.maHeThongRap);
      });
    }
    setListBrandAvailable(tempArr);
  }, [movieSchedule]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let tempArr = [];
    pickCinemaBrand && dispatch(getBrandAddresses(pickCinemaBrand));
    generateListOfDaysToWatch(pickCinemaBrand);
    if (movieSchedule.heThongRapChieu) {
      movieSchedule.heThongRapChieu.forEach((rapChieu) => {
        if (rapChieu.maHeThongRap === pickCinemaBrand) {
          setPickDateToBook(
            rapChieu.cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu.split(
              "T"
            )[0]
          );
          rapChieu.cumRapChieu.forEach((cumRapChieu) => {
            cumRapChieu.lichChieuPhim.forEach((lichChieu) => {
              tempArr.push(lichChieu.ngayChieuGioChieu.split("T")[0]);
            });
          });
        }
      });
    }
    setListTimeAvailable(tempArr);
  }, [pickCinemaBrand]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let tempArr = [];
    if (movieSchedule.heThongRapChieu) {
      movieSchedule.heThongRapChieu.forEach((rapChieu) => {
        if (rapChieu.maHeThongRap === pickCinemaBrand) {
          rapChieu.cumRapChieu.forEach((cumRapChieu) => {
            cumRapChieu.lichChieuPhim.every((lichChieu) => {
              if (
                lichChieu.ngayChieuGioChieu.split("T")[0] === pickDateToBook
              ) {
                tempArr.push(cumRapChieu);
                return false;
              } else {
                return true;
              }
            });
          });
        }
      });
    }
    setListCinemaAvailable(tempArr);
  }, [pickDateToBook, pickCinemaBrand]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const generateListOfDaysToWatch = (pickCinemaBrand) => {
    let tmpArr = [];
    let count = 15;
    let today = null;
    if (movieSchedule) {
      movieSchedule.heThongRapChieu?.every((rapChieu) => {
        if (rapChieu.maHeThongRap === pickCinemaBrand) {
          today = new Date(
            rapChieu.cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu.split(
              "T"
            )[0]
          );
          return false;
        } else {
          today = new Date(
            movieSchedule.heThongRapChieu[0].cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu.split(
              "T"
            )[0]
          );
          return true;
        }
      });
    }
    if (!!today) {
      tmpArr.push(today.toISOString().split("T")[0]);
      for (let index = 1; index <= count; index++) {
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + index);
        tmpArr.push(tomorrow.toISOString().split("T")[0]);
      }
    }
    setDateArr(tmpArr);
  };

  const handleFormatDate = (date) => {
    if (date === 1) {
      return "Thứ 2";
    } else if (date === 0) {
      return "Chủ Nhật";
    } else {
      return "Thứ " + (date + 1);
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
                Thời lượng:{" "}
                {movieDetail.lichChieu
                  ? movieDetail.lichChieu[0].thoiLuong
                  : ""}{" "}
                phút
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
                <a
                  className="booking-session-link"
                  style={{ textDecoration: "none", color: "white" }}
                  href="#movie-shedule"
                >
                  Đặt vé
                </a>
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
        <div id="movie-shedule" className="movie-schedule row">
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
                <div className="brand-name">{brand[0].tenHeThongRap}</div>
              </div>
            ))}
          </div>
          <div className="col-8 brand-content">
            <div className="wrap-days-of-weeks">
              <div className="days-of-week d-flex">
                {dateArr.map((time) => {
                  return (
                    <div
                      key={time}
                      className={
                        "day-in-week " +
                        (time === pickDateToBook ? "active" : "")
                      }
                      onClick={() => {
                        setPickDateToBook(time);
                      }}
                    >
                      <p className="day">
                        {" "}
                        {handleFormatDate(new Date(time).getDay())}
                      </p>
                      <p className="date">{new Date(time).getDate()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="wrap-time-session">
              {listBrandAvailable.includes(pickCinemaBrand) &&
              listTimeAvailable.includes(pickDateToBook) ? (
                <React.Fragment>
                  {listCinemaAvailable?.map((rap) => {
                    return (
                      <div
                        className="cinema-info"
                        key={rap?.maCumRap}
                        style={{ padding: "20px 20px 10px 20px" }}
                      >
                        <div
                          className="d-flex align-items-center movie-address"
                          style={{ paddingBottom: "20px" }}
                        >
                          <img
                            src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-vincom-3-2-16105957596860.png"
                            alt=""
                            style={{ width: "70px", marginRight: "10px" }}
                          />
                          <div className="wrap-info">
                            <span
                              style={{
                                fontSize: "16px",
                                display: "block",
                              }}
                            >
                              {rap?.tenCumRap}
                            </span>
                            {listAddresses.map((address) => {
                              if (address.maCumRap === rap.maCumRap) {
                                return (
                                  <span
                                    key={address.diaChi}
                                    style={{
                                      fontSize: "16px",
                                      display: "block",
                                    }}
                                  >
                                    {address.diaChi}
                                  </span>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </div>
                        </div>
                        <div className="d-flex flex-wrap cinema-time ">
                          {rap.lichChieuPhim.map((lichChieu) => {
                            if (
                              lichChieu.ngayChieuGioChieu.split("T")[0] ===
                              pickDateToBook
                            ) {
                              return (
                                <Link
                                  key={lichChieu.maLichChieu}
                                  className="pill-time"
                                  to={`/bookingTickets/${lichChieu.maLichChieu}`}
                                >
                                  {lichChieu.ngayChieuGioChieu.split("T")[1]}
                                </Link>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ) : (
                <div style={{ textAlign: "center" }}>Không có xuất chiếu</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
