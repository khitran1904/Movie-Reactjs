/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getMovieListAction } from "../../Action/Movie";
import { getListTheater } from "../../Action/Theater";
import { Link } from 'react-router-dom';
//styles
import './style.css'
//components
// import Header from '../../Components/Header';



export default function Home() {
    const { movieList } = useSelector((state) => state.movieReducer);
    const dispatch = useDispatch();

    
    // tương Đương voi componentDidMount, chi chạy 1 lan sau render 
    useEffect(() => {
        dispatch(getMovieListAction());
        dispatch(getListTheater());
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
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
                        <form action="">
                            <select name="movie1" id="movie" >
                                <option value="">Chọn phim</option>
                                {
                                    movieList.map((movie)=>{
                                        return (
                                            <option value={movie.maPhim}>{movie.tenPhim}</option>
                                        )
                                    })
                                }
                            </select>
                        </form>
                    </div>
                    <div className="dropdown">
                        <form action="">
                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </form>
                    </div>
                    <div className="dropdown">
                        <form action="">
                            <select name="cars" id="cars">
                                <option value="">Chọn rạp</option>
                                <option value="saab">Saab</option>
                                <option value="opel">Opel</option>
                                <option value="audi">Audi</option>
                            </select>
                        </form>
                    </div>
                    <a className="btn btn-success" >Mua vé</a>
                </div>
            </div>
            <div className="movie text-center" >
                <a href="/">Đang chiếu</a>
                <a href="/">Sắp chiếu</a>
                <div className="movie__item row movie_list" id="movie">
                    {movieList.map((movie) => {
                        return (
                            <div key={movie.maPhim} className="card text-left col-sm-4 my-4 mx-">
                                <img className="card-img-top" width="200px" height="300px" src={movie.hinhAnh} alt="HÌnh ảnh" />
                                <div className="card-body">
                                    <h6 className="card-title">{movie.tenPhim}</h6>
                                    {/* <Link to={`/movie/${movie.maPhim}-${movie.biDanh}`}> */}
                                    <Link to={`/movie/${movie.maPhim}`}>
                                        <button className="btn btn-success">Detail</button>
                                    </Link>
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
