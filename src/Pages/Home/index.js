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
  const [movieFilter, setFilterMovie] = useState(null);
  const [theaterFilter, setTheaterFilter] = useState(null);
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      dispatch(getListTheater(movieFilter));
    }
  }, [movieFilter]);

  const handleRenderMovieOption = () => {
    return movieList.map((movie) => (
      <option key={movie.maPhim} value={movie.maPhim}>
        {movie.tenPhim}
      </option>
    ));
  };

  const selectMovieFilter = (event) => {
    setFilterMovie(event.target.value);
  };

  const handleRenderTheaterOption = () => {
    return movieFilter ? (
      theaterList.map((theaterGroup) =>
        theaterGroup.cumRapChieu.map((theater) => (
          <option key={theater.maCumRap}>
            {/* {console.log(theaterGroup)}
            {console.log(theater)} */}
            {theater.tenCumRap}
          </option>
        ))
      )
    ) : (
      <option>Vui long chon phim</option>
    );
  };

  const selectTheaterFilter = (event) => {};

  const handleRenderDateOption = () => {
    return movieFilter ? (
      theaterList.map((theaterGroup) =>
        theaterGroup.cumRapChieu.map((theater) =>
          theater.lichChieuPhim.map((movieTime) => (
            <option key={movieTime.maLichChieu}>
              {movieTime.ngayChieuGioChieu}
            </option>
          ))
        )
      )
    ) : (
      <option>Vui long chon phim va rap</option>
    );
  };

  const selectDateFilter = () => {};
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
        <div className="carousel__filter">
          <div className="dropdown">
            <select onChange={selectMovieFilter}>
              <option>Phim</option>
              {handleRenderMovieOption()}
            </select>
          </div>
          <div className="dropdown">
            <form action="">
              <select onChange={selectTheaterFilter}>
                <option>Rap</option>
                {handleRenderTheaterOption()}
              </select>
            </form>
          </div>
          <div className="dropdown">
            <form action="">
              <select onChange={selectDateFilter}>
                <option>Ngay xem</option>
                {handleRenderDateOption()}
              </select>
            </form>
          </div>
          <div className="dropdown">
            <form action="">
              <select>
                <option value="">Chọn rạp</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
          <a className="btn btn-success">Mua vé</a>
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
                  {/* <Link to={`/movie/${movie.maPhim}`}> */}
                  <Link to={`/movie/${movie.maPhim}-${movie.biDanh}`}>
                    <button className="btn btn-success">Detail</button>
                  </Link>
                  {/* <p className="card-text">{movie.moTa}</p> */}
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

const object = {
  heThongRapChieu: [
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: "40739",
              maRap: "467",
              tenRap: "Rạp 7",
              ngayChieuGioChieu: "2020-11-14T06:33:59",
              giaVe: 90000,
              thoiLuong: 120,
            },
            {
              maLichChieu: "40740",
              maRap: "463",
              tenRap: "Rạp 3",
              ngayChieuGioChieu: "2020-11-14T06:34:20",
              giaVe: 90000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "bhd-star-cineplex-bitexco",
          tenCumRap: "BHD Star Cineplex - Bitexco",
          hinhAnh: null,
        },
        {
          lichChieuPhim: [
            {
              maLichChieu: "40775",
              maRap: "460",
              tenRap: "Rạp 10",
              ngayChieuGioChieu: "2019-01-02T12:00:00",
              giaVe: 90000,
              thoiLuong: 120,
            },
            {
              maLichChieu: "40783",
              maRap: "459",
              tenRap: "Rạp 9",
              ngayChieuGioChieu: "2020-11-01T11:40:00",
              giaVe: 90000,
              thoiLuong: 120,
            },
            {
              maLichChieu: "40792",
              maRap: "451",
              tenRap: "Rạp 1",
              ngayChieuGioChieu: "2019-01-02T12:00:00",
              giaVe: 90000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "bhd-star-cineplex-3-2",
          tenCumRap: "BHD Star Cineplex - 3/2",
          hinhAnh: null,
        },
      ],
      maHeThongRap: "BHDStar",
      tenHeThongRap: "BHD Star Cineplex",
      logo: "http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
    },
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: "40712",
              maRap: "587",
              tenRap: "Rạp 7",
              ngayChieuGioChieu: "2020-11-13T11:05:08",
              giaVe: 90000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "cgv-hung-vuong-plaza",
          tenCumRap: "CGV - Hùng Vương Plaza",
          hinhAnh: null,
        },
        {
          lichChieuPhim: [
            {
              maLichChieu: "41220",
              maRap: "511",
              tenRap: "Rạp 1",
              ngayChieuGioChieu: "2020-11-01T06:45:00",
              giaVe: 90000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "cgv-aeon-binh-tan",
          tenCumRap: "CGV - Aeon Bình Tân",
          hinhAnh: null,
        },
      ],
      maHeThongRap: "CGV",
      tenHeThongRap: "cgv",
      logo: "http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png",
    },
    {
      cumRapChieu: [
        {
          lichChieuPhim: [
            {
              maLichChieu: "41221",
              maRap: "722",
              tenRap: "Rạp 2",
              ngayChieuGioChieu: "2019-12-01T07:00:00",
              giaVe: 90000,
              thoiLuong: 120,
            },
          ],
          maCumRap: "cns-hai-ba-trung",
          tenCumRap: "CNS - Hai Bà Trưng",
          hinhAnh: null,
        },
      ],
      maHeThongRap: "CineStar",
      tenHeThongRap: "CineStar",
      logo: "http://movie0706.cybersoft.edu.vn/hinhanh/cinestar.png",
    },
  ],
  maPhim: 4517,
  tenPhim: "day la gap bơ",
  biDanh: "day-la-gap-bo",
  trailer: "https://www.youtube.com/embed/dyuUk_gMRkc",
  hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/my-shunshine_gp01.jpg",
  moTa: "okkkkkkkkkkkkkp",
  maNhom: "GP01",
  ngayKhoiChieu: "2020-10-10T00:00:00",
  danhGia: 10,
};
