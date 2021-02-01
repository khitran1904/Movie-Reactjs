import { GET_THEATER_LIST_FAIL,
        GET_THEATER_LIST_REQUEST,
        GET_THEATER_LIST_SUCCESS } from "../Constants/Theater";

import axios from "axios";

const getListTheater = () => { 
    return (dispatch) => {
        dispatch({
            type: GET_THEATER_LIST_REQUEST
        })
        axios.get(
            "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap"
        ).then((result)=>{
            dispatch({
                type:GET_THEATER_LIST_SUCCESS,
                payload: { data: result.data.items }
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
    }
}

export {getListTheater};