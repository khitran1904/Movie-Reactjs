import {
  AUTH_LOGIN_REQ,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
} from "../Constants/Auth";
import axios from "axios";
const loginAction = (values) => {
  console.log(values);
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
            error: error.response,
          },
        });
      });
  };
};

export { loginAction };
