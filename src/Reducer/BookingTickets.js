import { BOOKING_TICKET_REQUEST,
  BOOKING_TICKET_SUCCESS,
  BOOKING_TICKET_FAIL } from "../Constants/Booking";

let initialState = {
    ticket: null,
    loading:false,
    error: null,
  };


const BookingTicketsReducer = (state=initialState,action) =>{

  switch (action.type) {
    case BOOKING_TICKET_REQUEST :
      return {...state,loading:true};
    case BOOKING_TICKET_SUCCESS:
      return {...state,loading:false,ticket: action.payload.data}
    case BOOKING_TICKET_FAIL:
      return {...state,loading:false,error:action.payload.error}
    default:
        return state;
  }
}

export default BookingTicketsReducer;