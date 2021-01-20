import { GET_MOVIE_LIST_FAIL,GET_MOVIE_LIST_REQUEST,GET_MOVIE_LIST_SUCCESS } from "../Constants/Movie";
import axios from "../utils/axiosClient";

export const getMovieList = () =>{
    return(dispatch)=>{
        dispatch({
            type:GET_MOVIE_LIST_REQUEST
        });
        axios.get("/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=9"
        ).then((result)=>{
            dispatch({
                type:GET_MOVIE_LIST_SUCCESS,
                payload:{data:result.data}
            })
        }).catch(error=>{
            dispatch({
                type:GET_MOVIE_LIST_FAIL,
                payload:{
                    error:error.response.data,
                },
            })
        })
    }
}