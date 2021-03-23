import { GET_LIST_SET_REQUEST ,
    GET_LIST_SET_SUCCESS,
    GET_LIST_SET_FAIL } from "../Constants/Booking";

import axios from "../utils/axiosClient";

const getListSeat = (calendarParam) =>{
return (dispatch) => {
    dispatch({
        type:GET_LIST_SET_REQUEST
    });
    axios.get(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${calendarParam}`,
        )
        .then((result)=>{
            dispatch({
                type:GET_LIST_SET_SUCCESS,
                payload: {
                    data: result.data.danhSachGhe,
                    thongTinPhim:result.data.thongTinPhim
                }
            })
        })
        .catch((error)=>{
            dispatch({
                type: GET_LIST_SET_FAIL,
                payload: {
                    error: error.response.data,
                },
            })
        })
}
}


export {getListSeat};