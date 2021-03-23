import {
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  GET_MOVIE_DETAIL_FAILED,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_REQUEST,
  GET_MOVIE_LIST_UPCOMING_REQUEST,
  GET_MOVIE_LIST_UPCOMING_SUCCESS,
  GET_MOVIE_LIST_UPCOMING_FAIL,
  GET_MOVIE_DETAIL_SCHEDULE_SUCCESS,
  GET_MOVIE_DETAIL_SCHEDULE_FAILED,
} from "../Constants/Movie";
import axiosCustom from "../utils/axiosClient";
const getMovieListAction = () => {
  return (dispatch) => {
    dispatch({
      type: GET_MOVIE_LIST_REQUEST,
    });
    axiosCustom
      .get(
        "QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=3&soPhanTuTrenTrang=8"
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

const getMovieListAction2 = () => {
  return (dispatch) => {
    dispatch({
      type: GET_MOVIE_LIST_UPCOMING_REQUEST,
    });
    axiosCustom
      .get(
        "QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=2&soPhanTuTrenTrang=8"
      )
      .then((result) => {
        dispatch({
          type: GET_MOVIE_LIST_UPCOMING_SUCCESS,
          payload: { data: result.data.items },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MOVIE_LIST_UPCOMING_FAIL,
          payload: {
            error: error.response,
          },
        });
      });
  };
};

const getMovieDetailAction = (movieParam) => {
  let movieId = movieParam.split("-")[0];
  return (dispatch, getState) => {
    dispatch({
      type: GET_MOVIE_DETAIL_REQUEST,
    });
    axiosCustom
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
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

const getMovieDetailScheduleAction = (movieParam) => {
  let movieId = movieParam.split("-")[0];
  return (dispatch, getState) => {
    axiosCustom
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`)
      .then((result) => {
        dispatch({
          type: GET_MOVIE_DETAIL_SCHEDULE_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MOVIE_DETAIL_SCHEDULE_FAILED,
          payload: { error: error.response.data },
        });
      });
  };
};

export {
  getMovieListAction,
  getMovieDetailAction,
  getMovieListAction2,
  getMovieDetailScheduleAction,
};
