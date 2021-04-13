import {
  GET_THEATER_LIST_FAIL,
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
  GET_THEATER_BRAND_FAILED,
  GET_THEATER_BRAND_REQUEST,
  GET_THEATER_BRAND_SUCCESS,
  RESET_THEATER_BRAND_LIST,
  GET_THEATER_ADDRESSES_SUCCESS,
  GET_THEATER_ADDRESSES_FAILED,
} from "../Constants/Theater";
import axiosCustom from "../utils/axiosClient";
const getListTheater = (maPhim) => {
  return (dispatch) => {
    dispatch({
      type: GET_THEATER_LIST_REQUEST,
    });
    axiosCustom
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
      .then((result) => {
        dispatch({
          type: GET_THEATER_LIST_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_THEATER_LIST_FAIL,
          payload: {
            error: error.response,
          },
        });
      });
  };
};

const getTheaterBrand = (brand) => {
  return (dispatch) => {
    dispatch({
      type: GET_THEATER_BRAND_REQUEST,
    });
    axiosCustom
      .get(`QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${brand}`)
      .then((result) => {
        dispatch({
          type: GET_THEATER_BRAND_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_THEATER_BRAND_FAILED,
          payload: { error: error.response },
        });
      });
  };
};

const resetTheaterBrand = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_THEATER_BRAND_LIST,
    });
  };
};

const getBrandAddresses = (brand) => {
  return (dispatch) => {
    axiosCustom
      .get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${brand}`)
      .then((result) => {
        dispatch({
          type: GET_THEATER_ADDRESSES_SUCCESS,
          payload: { data: result.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_THEATER_ADDRESSES_FAILED,
          payload: { error: error.response.data },
        });
      });
  };
};
export {
  getListTheater,
  getTheaterBrand,
  resetTheaterBrand,
  getBrandAddresses,
};
