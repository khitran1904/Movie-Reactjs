/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieListAction, getMovieListAction2 } from "../../Action/Movie";
import { getListTheater } from "../../Action/Theater";
import { Link } from "react-router-dom";
//styles
import "./style.css";

import { Modal } from "react-bootstrap";

export default function Home() {
  const { movieList, movieListUpcoming } = useSelector(
    (state) => state.movieReducer
  );
  const { theaterList } = useSelector((state) => state.theaterReducer);
  const [selectMovieToBook, setSelectMovieToBook] = useState({
    movie: "",
    theater: "",
    date: "",
    time: "",
  });
  const isMounted = useRef(true);
  var filterTimeList = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction());
    dispatch(getMovieListAction2());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      dispatch(getListTheater(selectMovieToBook.movie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMovieToBook.movie]);

  const handleRenderMovieOption = () => {
    return movieList.map((movie) => (
      <option key={movie.maPhim} value={movie.maPhim}>
        {movie.tenPhim}
      </option>
    ));
  };

  const handleRenderTheaterOption = () => {
    return theaterList.map((theaterGroup) =>
      theaterGroup.cumRapChieu.map((theater) => (
        <option value={theater.maCumRap} key={theater.maCumRap}>
          {theater.tenCumRap}
        </option>
      ))
    );
  };

  const handleRenderDateOption = () => {
    theaterList.forEach((theaterGroup) => {
      theaterGroup.cumRapChieu.forEach((theater) => {
        if (theater.maCumRap === selectMovieToBook.theater) {
          theater.lichChieuPhim.forEach((movieTime) => {
            filterTimeList.push(movieTime.ngayChieuGioChieu.split("T")[0]);
          });
        }
      });
    });

    filterTimeList = filterTimeList.filter((item, index) => {
      return filterTimeList.indexOf(item) === index;
    });
    return filterTimeList.map((time) => <option key={time}>{time}</option>);
  };

  const handleRenderTimeOption = () => {
    return theaterList.map((theaterGroup) => {
      // eslint-disable-next-line array-callback-return
      return theaterGroup.cumRapChieu.map((theater) => {
        if (theater.maCumRap === selectMovieToBook.theater) {
          // eslint-disable-next-line array-callback-return
          return theater.lichChieuPhim.map((movieTime) => {
            if (
              movieTime.ngayChieuGioChieu.split("T")[0] ===
              selectMovieToBook.date
            ) {
              return (
                <option key={movieTime.ngayChieuGioChieu.split("T")[1]}>
                  {movieTime.ngayChieuGioChieu.split("T")[1]}
                </option>
              );
            }
          });
        }
      });
    });
  };
  const handleChange = (e) => {
    setSelectMovieToBook((currentValue) => {
      return {
        ...currentValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <div className="carousel__movie" id="">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <ol className="carousel-indicators carousel__customs">
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
            />
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
            />
            <li
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
            />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://s3img.vcdn.vn/123phim/2020/12/chi-13-16088073540614.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://s3img.vcdn.vn/123phim/2021/01/lua-deu-gap-lua-dao-16105107337344.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://s3img.vcdn.vn/123phim/2021/01/sam-hoi-16106874942953.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </a>
        </div>
        <div className="carousel__filter" id="filter">
          <div className="dropdown">
            <select name="movie" onChange={handleChange}>
              <option>Chọn Phim</option>
              {handleRenderMovieOption()}
            </select>
          </div>
          <div className="dropdown">
            <form action="">
              <select name="theater" onChange={handleChange}>
                <option>Chọn Rạp</option>
                {selectMovieToBook.movie ? (
                  handleRenderTheaterOption()
                ) : (
                  <option>Vui lòng chọn phim</option>
                )}
              </select>
            </form>
          </div>
          <div className="dropdown">
            <form action="">
              <select name="date" onChange={handleChange}>
                <option>Chọn ngày xem</option>
                {selectMovieToBook.movie && selectMovieToBook.theater ? (
                  handleRenderDateOption()
                ) : (
                  <option>Vui lòng chọn rạp và phim</option>
                )}
              </select>
            </form>
          </div>
          <div className="dropdown">
            <form action="">
              <select name="time" onChange={handleChange}>
                <option value="">Chọn suất chiếu</option>
                {selectMovieToBook.movie &&
                selectMovieToBook.theater &&
                selectMovieToBook.date ? (
                  handleRenderTimeOption()
                ) : (
                  <option>Vui lòng chọn ngày xem rạp và phim</option>
                )}
              </select>
            </form>
          </div>

          <button
            disabled={
              selectMovieToBook.movie &&
              selectMovieToBook.theater &&
              selectMovieToBook.date &&
              selectMovieToBook.time
                ? false
                : true
            }
            className="btn btn-success"
          >
            <Link
              className="btn__filter"
              to={{
                pathname: "/checkout",
                state: { bookMovie: selectMovieToBook },
              }}
            >
              Mua Vé
            </Link>
          </button>
        </div>
      </div>
      <div className="movie text-center" id="LichChieu">
        <div>
          <ul
            className="nav nav-pills mb-3 justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Đang chiếu
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Sắp chiếu
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div
                className="list__dangChieu movie__item row movie_list"
                id="movie"
              >
                {movieList.map((movie) => {
                  return (
                    <div
                      key={movie.maPhim}
                      className=" text-left col-md-3 col-sm-4 my-2 "
                    >
                      <div className="div__image">
                        <img
                          className="item__image"
                          width="205px"
                          height="300px"
                          src={movie.hinhAnh}
                          alt="Hình ảnh"
                        />
                        <div className="image__overlay">
                          <i
                            className="fa fa-play-circle"
                            onClick={() => {
                              handleShow();
                              console.log(movie.trailer);
                            }}
                          ></i>
                        </div>
                      </div>
                      <div className="">
                        <p className="movie__score px-1 mx-2">
                          {movie.danhGia} <i className="fa fa-star"></i>
                        </p>
                        <h6 className="card-title movie__title ">
                          {movie.tenPhim}
                        </h6>
                        <Link to={`/movie/${movie.maPhim}-${movie.biDanh}`}>
                          <button className="btn__buyTicket btn btn-success">
                            Mua Vé
                          </button>
                        </Link>
                      </div>
                      <Modal
                        className="modal"
                        show={show}
                        onHide={handleClose}
                        animation={true}
                      >
                        <Modal.Body className=" modal__body">
                          <div
                            style={{
                              padding: "56.25% 0 0 0",
                              position: "relative",
                            }}
                          >
                            <iframe
                              id="ytplayer"
                              src={movie.trailer.replace(
                                "/watch?v=",
                                "/embed/"
                              )}
                              title={movie.tenPhim}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                              frameBorder={0}
                              allow="autoplay; fullscreen"
                              allowFullScreen
                            />
                          </div>

                          {/* <iframe className="video__trailer" src={movie.trailer} title={movie.tenPhim}></iframe> */}
                        </Modal.Body>
                      </Modal>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div
                className="list__dangChieu movie__item row movie_list"
                id="movie"
              >
                {movieListUpcoming.map((movie) => {
                  return (
                    <div
                      key={movie.maPhim}
                      className=" text-left col-md-3 col-sm-4 my-2 "
                    >
                      <div className="div__image">
                        <img
                          className="item__image"
                          width="205px"
                          height="300px"
                          src={movie.hinhAnh}
                          alt="Hình ảnh"
                        />
                        <div className="image__overlay">
                          <i
                            className="fa fa-play-circle"
                            onClick={handleShow}
                          ></i>
                        </div>
                      </div>
                      <div className="">
                        <p className="movie__score px-1 mx-2">
                          {movie.danhGia} <i className="fa fa-star"></i>
                        </p>
                        <h6 className="card-title movie__title ">
                          {movie.tenPhim}
                        </h6>
                        <Link to={`/movie/${movie.maPhim}-${movie.biDanh}`}>
                          <button className="btn__buyTicket btn btn-success">
                            Mua Vé
                          </button>
                        </Link>
                      </div>
                      <Modal
                        className="modal"
                        show={show}
                        onHide={handleClose}
                        animation={true}
                      >
                        <Modal.Body className=" modal__body">
                          {/* <iframe
                            className="video__trailer"
                            src={movie.trailer}
                            title={movie.tenPhim}
                          ></iframe> */}
                          <div
                            style={{
                              padding: "56.25% 0 0 0",
                              position: "relative",
                            }}
                          >
                            <iframe
                              id="ytplayer"
                              src={movie.trailer.replace(
                                "/watch?v=",
                                "/embed/"
                              )}
                              title={movie.tenPhim}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                              frameBorder={0}
                              allow="autoplay; fullscreen"
                              allowFullScreen
                            />
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="" id="new">
        <div>
          <ul className="nav nav-pills mb-3 news" id="pills-tab" role="tablist">
            <li className="nav-item new__link" role="presentation">
              <a
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home2"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Điện ảnh 24H
              </a>
            </li>
            <li className="nav-item new__link" role="presentation">
              <a
                className="nav-link "
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile2"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Khuyến mãi
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home2"
              role="tabpanel"
              aria-labelledby="pills-home-tab2"
            >
              <div className="row new__list">
                <div className="col-6">
                  <img
                    src="https://s3img.vcdn.vn/123phim/2020/10/d497d585fea7704c5106cccb55fd6622.jpg"
                    alt=""
                  />
                  <a
                    className="title"
                    href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman"
                  >
                    Ngô Thanh Vân xinh quá trời
                  </a>
                  <p>
                    Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi
                    sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim
                    mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt
                    Nam!.....
                  </p>
                </div>
                <div className="col-6">
                  <img src="./img/new2.jpg" alt="" />
                  <a
                    className="title"
                    href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh"
                  >
                    “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành
                  </a>
                  <p>
                    Vào đúng ngày Nhà giáo Việt Nam 20/11, khu vui chơi sống ảo
                    độc-lạ-chill nhất từ trước đến giờ sẽ chính thức khai trương
                    tại 360 Giải Phóng! ...
                  </p>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile2"
              role="tabpanel"
              aria-labelledby="pills-profile-tab2"
            >
              <div className="row new__list">
                <div className="col-6">
                  <img
                    src="https://s3img.vcdn.vn/123phim/2021/03/bhd-59k-ve-ca-tuan-16151022245962.jpg"
                    alt=""
                  />
                  <a
                    className="title"
                    href="https://tix.vn/khuyen-mai/7958-bhd-59k-ve-ca-tuan"
                  >
                    BHD 59K/VÉ CẢ TUẦN !!!
                  </a>
                  <p>
                    Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá
                    59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay....
                  </p>
                </div>
                <div className="col-6">
                  <img
                    src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg"
                    alt=""
                  />
                  <a
                    className="title"
                    href="https://tix.vn/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve"
                  >
                    TIX 1K/VÉ NGẠI CHI GIÁ VÉ
                  </a>
                  <p>
                    Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm
                    02 voucher thanh toán ZaloPay thả ga..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
