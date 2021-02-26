/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieListAction } from "../../Action/Movie";
import { getListTheater } from "../../Action/Theater";
import { Link } from "react-router-dom";
//styles
import "./style.css";

export default function Home() {
  const { movieList } = useSelector((state) => state.movieReducer);
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
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      dispatch(getListTheater(selectMovieToBook.movie));
    }
  }, [selectMovieToBook.movie]);

  // const formatDate = (date) => {
  //   const dateObj = new Date(date + "T00:00:00");
  //   return new Intl.DateTimeFormat("en-US").format(dateObj);
  // };
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
    theaterList.map((theaterGroup) => {
      theaterGroup.cumRapChieu.map((theater) => {
        if (theater.maCumRap === selectMovieToBook.theater) {
          theater.lichChieuPhim.map((movieTime) => {
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
      return theaterGroup.cumRapChieu.map((theater) => {
        if (theater.maCumRap === selectMovieToBook.theater) {
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
  const handleClick = (e) => {
    var boo = !!selectMovieToBook;
    console.log(boo);
  };
  return (
    <div>
      {console.log(selectMovieToBook)}
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
        <div className="carousel__filter">
          <div className="dropdown">
            <select name="movie" onChange={handleChange}>
              <option>Phim</option>
              {handleRenderMovieOption()}
            </select>
          </div>
          <div className="dropdown">
            <form action="">
              <select name="theater" onChange={handleChange}>
                <option>Rap</option>
                {selectMovieToBook.movie ? (
                  handleRenderTheaterOption()
                ) : (
                  <option>Vui long chon phim</option>
                )}
              </select>
            </form>
          </div>
          <div className="dropdown">
            <form action="">
              <select name="date" onChange={handleChange}>
                <option>Ngay xem</option>
                {selectMovieToBook.movie && selectMovieToBook.theater ? (
                  handleRenderDateOption()
                ) : (
                  <option>Vui long chon phim va rap</option>
                )}
              </select>
            </form>
          </div>
          <div className="dropdown">
            <form action="">
              <select name="time" onChange={handleChange}>
                <option value="">Suat</option>
                {selectMovieToBook.movie &&
                selectMovieToBook.theater &&
                selectMovieToBook.date ? (
                  handleRenderTimeOption()
                ) : (
                  <option>Vui long chon phim, rap va ngay xem</option>
                )}
              </select>
            </form>
          </div>
          <a onClick={handleClick} className="btn btn-success">
            Mua vé
          </a>
        </div>
      </div>
      <div className="movie text-center">
        <a href="/">Đang chiếu</a>
        <a href="/">Sắp chiếu</a>
        <div className="movie__item row movie_list" id="movie">
          {movieList.map((movie) => {
            return (
              <div
                key={movie.maPhim}
                className="card text-left col-sm-4 my-4 mx-"
              >
                <img
                  className="card-img-top"
                  width="200px"
                  height="300px"
                  src={movie.hinhAnh}
                  alt="HÌnh ảnh"
                />
                <div className="card-body">
                  <h6 className="card-title">{movie.tenPhim}</h6>
                  <Link to={`/movie/${movie.maPhim}-${movie.biDanh}`}>
                    <button className="btn btn-success">Detail</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="agenda"></div>
      <div className="news"></div>
      <footer></footer>
    </div>
  );
}
