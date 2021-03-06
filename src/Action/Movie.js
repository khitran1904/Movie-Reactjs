import {
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_DETAIL_FAILED,
  GET_MOVIE_DETAIL_REQUEST,
  GET_MOVIE_DETAIL_SUCCESS,
} from "../Constants/Movie";
import axiosCustom from "../utils/axiosClient";
import axios from "axios";

const getMovieListAction = () => {
  return (dispatch) => {
    dispatch({
      type: GET_MOVIE_LIST_REQUEST,
    });
    axios
      .get(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=8"
      )
      .then((result) => {
        dispatch({
          type: GET_MOVIE_LIST_SUCCESS,
          payload: { data: result.data.items },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MOVIE_LIST_FAIL,
          payload: {
            error: error.response,
          },
        });
      });
  };
};

const getMovieDetailAction = (movieParam) => {
  let movieId = movieParam.split("-");
  return (dispatch, getState) => {
    dispatch({
      type: GET_MOVIE_DETAIL_REQUEST,
    });
    axiosCustom
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId[0]}`)
      .then((result) => {
        dispatch({
          type: GET_MOVIE_DETAIL_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MOVIE_DETAIL_FAILED,
          payload: { error: error.response.data },
        });
      });
  };
};

export { getMovieListAction, getMovieDetailAction };
