import { BOOKING_TICKET_REQUEST,
        BOOKING_TICKET_SUCCESS,
        BOOKING_TICKET_FAIL } from "../Constants/Booking";

import axios from "../utils/axiosClient";

const bookingTicket = (value) =>{
    return (dispatch) => {
        dispatch({
            type:BOOKING_TICKET_REQUEST
        });
        axios.post(
            "QuanLyDatVe/DatVe", value)
            .then((result)=>{
                dispatch({
                    type:BOOKING_TICKET_SUCCESS,
                    payload: {
                        data: result.data,
                    }
                })
            })
            .catch((error)=>{
                dispatch({
                    type: BOOKING_TICKET_FAIL,
                    payload: {
                        error: error.response.data,
                    },
                })
            })
    }
}


export {bookingTicket};