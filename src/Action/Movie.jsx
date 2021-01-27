import { GET_MOVIE_LIST_FAIL,GET_MOVIE_LIST_REQUEST,GET_MOVIE_LIST_SUCCESS,
    LOGIN_REQUEST,LOGIN_FAIL,LOGIN_SUCCESS } from "../Constants/Movie";
import axiosCustom from "../utils/axiosClient";
import axios from "axios";

const getMovieListAction = () =>{
    return(dispatch)=>{
        dispatch({
            type:GET_MOVIE_LIST_REQUEST
        });
        axiosCustom.get("/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=5&soPhanTuTrenTrang=9"
        ).then((result)=>{
            dispatch({
                type: GET_MOVIE_LIST_SUCCESS,
                payload:{data:result.data.items}
            })
        }).catch(error=>{
            dispatch({
                type:GET_MOVIE_LIST_FAIL,
                payload:{
                    error:error.response,
                },
            })
        })
    }
}

const login = (values)=>{
    return (dispatch)=>{
        dispatch({
            type: LOGIN_REQUEST
        });
        axios.post("https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        values).then( result => {
            localStorage.setItem("user", JSON.stringify(result.data) );
            dispatch({
                type:LOGIN_SUCCESS,
                payload:{
                    data:result.data,
                },
            });
        }).catch( error =>{
            dispatch({
                type:LOGIN_FAIL,
                payload:{
                    error:error.response.data,
                },
            })
        })
    };
}

export {getMovieListAction,login };