import {
  AUTH_LOGIN_REQ,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
} from "../Constants/Auth";
import {
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ALERT_RESET,
} from "../Constants/SignUp";

import axios from "axios";

const loginAction = (values) => {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGIN_REQ,
    });
    axios
      .post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        values
      )
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: AUTH_LOGIN_FAILED,
          payload: {
            error: error.response.data,
          },
        });
      });
  };
};

const signUpAction = (values) => {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });
    axios
      .post(
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        values
      )
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: {
            data: result.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_UP_FAIL,
          payload: {
            error: error.response.data,
          },
        });
      });
  };
};

const closeAction = () => {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP_ALERT_RESET,
    });
  };
};

export { loginAction, signUpAction, closeAction };
