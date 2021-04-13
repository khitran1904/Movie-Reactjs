import {
  GET_LIST_SET_REQUEST,
  GET_LIST_SET_SUCCESS,
  GET_LIST_SET_FAIL,
} from "../Constants/Booking";

const initialState = {
  movieInfo: "",
  listSeat: [],
  loading: false,
  error: "",
};

const ListSeatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_SET_REQUEST:
      return { ...state, loading: true };
    case GET_LIST_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        listSeat: action.payload.data,
        movieInfo: action.payload.thongTinPhim,
      };
    case GET_LIST_SET_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default ListSeatReducer;
