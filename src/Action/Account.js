import {
    GET_ACCOUNT_FAIL, GET_ACCOUNT_REQUEST, GET_ACCOUNT_SUCCESS,
    CHANGE_ACCOUNT_REQUEST,
    CHANGE_ACCOUNT_SUCCESS,
    CHANGE_ACCOUNT_FAIL
} from "../Constants/Account";
import axios from "axios";
import axiosClient from "../utils/axiosClient";

const userStorage = JSON.parse(localStorage.getItem("user"));
let user = { taiKhoan: userStorage.taiKhoan };

const getAccountInfo = () => {
    return (dispatch) => {
        dispatch({
            type: GET_ACCOUNT_REQUEST
        })
        axios
            .post(
                "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
                user
            )
            .then((result) => {
                dispatch({
                    type: GET_ACCOUNT_SUCCESS,
                    payload: {
                        data: result.data,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_ACCOUNT_FAIL,
                    payload: {
                        error: error.response.data,
                    },
                });
            });
    }
}

const ChangeAccountInfo = (value) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ACCOUNT_REQUEST
        })
        axiosClient
            .put(
                "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
                value
            )
            .then((result) => {
                dispatch({
                    type: CHANGE_ACCOUNT_SUCCESS,
                    payload: {
                        data: result.data,
                    },
                });
            })
            .catch((error) => {
                dispatch({
                    type: CHANGE_ACCOUNT_FAIL,
                    payload: {
                        error: error.response.data,
                    },
                });
            });
    }
}

export { getAccountInfo, ChangeAccountInfo };