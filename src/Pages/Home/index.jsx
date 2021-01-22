import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getMovieList } from "../../Action/Movie";

export default function Home() {
    const { movieList } = useSelector((state) => state.movieReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(movieList);
    console.log('movieList');
    return (
        <div>
            <header className="header" >
                <a href="/"><img className="logo" src="./img/logo.jpg" alt="" /></a>
                <div className="header__center" >
                    <ul className="center__item" >
                        <li><a href="/"  >Lịch Chiếu</a></li>
                        <li><a href="/">Cụm rạp</a></li>
                        <li><a href="#movie">Tin Tức</a></li>
                        <li><a href="/">Ứng dụng</a></li>
                    </ul>
                </div>
                <a href="/login" className="btn header__btn" >
                    <i class="fa fa-user-tie"></i> &ensp; Đăng nhập / Đăng Kí
                </a>
            </header>

            <div className="carousel__movie" id="" >
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <ol className="carousel-indicators carousel__customs">
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" />
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} />
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://s3img.vcdn.vn/123phim/2020/12/chi-13-16088073540614.png" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://s3img.vcdn.vn/123phim/2021/01/lua-deu-gap-lua-dao-16105107337344.jpg" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://s3img.vcdn.vn/123phim/2021/01/sam-hoi-16106874942953.jpg" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
                <div className="carousel__filter">
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="/" role="button"
                            id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown link
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li>Action</li>
                            <li>Another action</li>
                            <li>Something else here</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="movie text-center" >
                <a href="/">Đang chiếu</a>
                <a href="/">Sắp chiếu</a>
                <div className="movie__item row movie_list" id="movie">
                    {movieList.map((movie) => {
                        return (
                            <div className="card text-left col-sm-4 my-4 mx-">
                                <img className="card-img-top" width="200px" height="300px" src={movie.hinhAnh} alt="HÌnh ảnh" />
                                <div className="card-body">
                                    <h6 className="card-title">{movie.tenPhim}</h6>
                                    {/* <p className="card-text">{movie.moTa}</p> */}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <div className="agenda" ></div>
            <div className="news" ></div>
            <footer></footer>
        </div>
    )
}
